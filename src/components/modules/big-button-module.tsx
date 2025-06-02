import { Text, useAnimations } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { BigButtonState } from "../../generated/proto/big_button_module.pb";
import { Color, PressType } from "../../generated/proto/common.pb";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { GameService } from "../../services/api";
import { pbColorToHex } from "../../utils/pbcolor-to-hex";
import { CustomMaterials } from "./custom-materials";
import Module, { type BaseModuleProps } from "./module";

const LETTER_SPACING = 0;
const FONT_WEIGHT = 500;
const FONT_SIZE = 0.0135;
const HOLD_THRESHOLD_MS = 250;
const TEXT_OFFSET = 0.1332;

export default function BigButtonModule({
  moduleId,
  name = "big-button",
  position,
  state,
}: BaseModuleProps & {
  state?: BigButtonState;
}) {
  const coverRef = useRef<THREE.Mesh>(null);
  const { nodes, materials, animations } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { actions, mixer } = useAnimations(animations, coverRef);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const [stripColor, setStripColor] = useState<Color>();
  const { sessionId, selectedBombId, selectedModuleId } = useGameStore();
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [prevAction, setPrevAction] = useState<any>(null);
  const [pressDownTime, setPressDownTime] = useState(0);
  const [longPressTimeout, setLongPressTimeout] = useState<number>();
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    setStripColor(undefined);
    if (prevAction) {
      prevAction.fadeOut(0);
    }

    // Flip up cover
    if (moduleId === selectedModuleId) {
      const action = actions?.OpenAction;
      if (action) {
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.timeScale = 1;
        action.reset().play();
        setIsCoverOpen(true);
      }
    } else {
      // Leaving the module, close the cover, etc.
      const action = actions?.CloseAction;
      if (action && isCoverOpen) {
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.timeScale = 1;
        action.reset().play();
        setIsCoverOpen(false);
      }
    }

    mixer.addEventListener("finished", (e: any) => {
      if (e.action === actions?.OpenAction) {
        setPrevAction(actions?.OpenAction);
      } else if (e.action === actions?.CloseAction) {
        setPrevAction(actions?.CloseAction);
      }
    });
  }, [selectedModuleId]);

  const onPointerDown = useCallback(() => {
    if (isSolved) return;
    if (selectedModuleId !== moduleId) return;

    setPressDownTime(Date.now());

    const timeout = setTimeout(async () => {
      const response = await GameService.SendInput({
        sessionId,
        bombId: selectedBombId,
        moduleId,
        bigButtonInput: {
          pressType: PressType.HOLD,
        },
      });

      setStripColor(response.bigButtonInputResult?.stripColor);
    }, 500);

    setLongPressTimeout(timeout);
  }, [
    selectedModuleId,
    moduleId,
    sessionId,
    selectedBombId,
    isSolved,
    state?.buttonColor,
  ]);

  const onPointerUp = async () => {
    if (isSolved) return;
    if (selectedModuleId !== moduleId) return;

    clearTimeout(longPressTimeout);
    setStripColor(undefined);

    const pressDuration = Date.now() - pressDownTime;
    const isHold = pressDuration > HOLD_THRESHOLD_MS;
    const response = await GameService.SendInput({
      sessionId,
      bombId: selectedBombId,
      moduleId,
      bigButtonInput: {
        pressType: isHold ? PressType.RELEASE : PressType.TAP,
        releaseTimestamp: isHold
          ? Math.round(Date.now() / 1000).toString()
          : undefined,
      },
    });

    if (response.solved) {
      setIsSolved(true);
    }
  };

  const buttonColor: THREE.MeshStandardMaterial =
    materials["Button Red"].clone();
  buttonColor.color = new THREE.Color(
    pbColorToHex(state?.buttonColor || Color.UNKNOWN),
  );

  if (stripColor) {
    CustomMaterials.RingLight.color = new THREE.Color(pbColorToHex(stripColor));
    CustomMaterials.RingLight.emissive = new THREE.Color(
      pbColorToHex(stripColor),
    );
    CustomMaterials.RingLight.emissiveIntensity = 0.5;
  }

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonModule.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <group position={[0.002, 0.096, -0.074]} scale={[0.943, 0.943, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ButtonHead.geometry}
            material={buttonColor}
            position={[0, -0.108, 0.127]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.043, 0.006, 0.043]}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          />
          <Text
            position={[0, -0.108, TEXT_OFFSET]}
            fontSize={FONT_SIZE}
            letterSpacing={LETTER_SPACING}
            fontWeight={FONT_WEIGHT}
            color={
              state?.buttonColor === Color.YELLOW ||
              state?.buttonColor === Color.WHITE
                ? "black"
                : "white"
            }
          >
            {state?.label?.toUpperCase()}
          </Text>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ButtonShaft.geometry}
            material={buttonColor}
            position={[0, -0.108, 0.113]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.032, 0.011, 0.032]}
          />
        </group>
        <mesh
          name="Cover"
          ref={coverRef}
          castShadow
          receiveShadow
          geometry={nodes.Cover.geometry}
          material={materials.ClearPlastic}
          position={[0, 0.077, 0.033]}
          scale={[0.077, 0.077, 0.079]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hinge.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0.077, 0.033]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.004, 0.017, 0.004]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightRing.geometry}
          material={
            !!stripColor ? CustomMaterials.RingLight : materials["Unlit light"]
          }
          position={[0.002, -0.007, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.425, 1.466, 1.425]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light005.geometry}
          material={
            isSolved ? CustomMaterials.GreenLight : materials["Unlit light"]
          }
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}
