import { Text } from "@react-three/drei";
import { type ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { NeedyVentGasState } from "../../generated/proto/needy_vent_gas_module.pb";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { GameService } from "../../services/api";
import type { BaseModuleProps } from "./module";
import Module from "./module";

const TEXT_Y_OFFSET = 0.003;
const GREEN_TEXT_OFFSET = 0.001;
const RED_TEXT_OFFSET = 0.003;

const GREEN_FONT_SIZE = 0.0125;
const RED_FONT_SIZE = 0.015;

const GREEN_FONT_FAMILY = "/fonts/Inter-Medium.ttf";
const RED_FONT_FAMILY = "/fonts/Digital7_Mono.ttf";

const GREEN_FONT_COLOR = 0x5b8c45;
const RED_FONT_COLOR = 0x9e3029;

const GREEN_TEXT_ATTRS = {
  fontSize: GREEN_FONT_SIZE,
  font: GREEN_FONT_FAMILY,
  color: GREEN_FONT_COLOR,
  position: [0, TEXT_Y_OFFSET, GREEN_TEXT_OFFSET] as [number, number, number],
  textAlign: "center" as any,
};

const COUNTDOWN_TEXT_ATTRS = {
  fontSize: RED_FONT_SIZE,
  font: RED_FONT_FAMILY,
  color: RED_FONT_COLOR,
  position: [0, 0, RED_TEXT_OFFSET] as [number, number, number],
  textAlign: "center" as any,
};

export default function NeedyVentGasModule({
  moduleId,
  name = "needy-vent-gas",
  position,
  state,
}: BaseModuleProps & {
  state?: NeedyVentGasState;
}) {
  const { selectedBombId, selectedModuleId, sessionId } = useGameStore();
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const [countdownStartedAt, setCountdownStartedAt] = useState<
    number | undefined
  >(Number(state?.countdownStartedAt));
  const [displayedQuestion, setDisplayedQuestion] = useState<
    string | undefined
  >(state?.displayedQuestion);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const yButtonRef = useRef<any>(null);
  const nButtonRef = useRef<any>(null);

  useEffect(() => {
    if (!countdownStartedAt) return;

    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownStartedAt]);

  const remainingTimeSeconds = useMemo(() => {
    if (!countdownStartedAt) return undefined;
    const elapsedSeconds = Math.ceil(currentTime / 1000 - countdownStartedAt);
    return Math.max(0, 30 - elapsedSeconds);
  }, [countdownStartedAt, currentTime]);

  const onButtonClick = useCallback(
    async (e: ThreeEvent<MouseEvent>) => {
      if (selectedModuleId !== moduleId) return;
      if (!e.object) return;

      const button = e.object;
      let input = false;
      if (button === yButtonRef.current) {
        input = true;
      }

      const res = await GameService.SendInput({
        sessionId,
        bombId: selectedBombId,
        moduleId,
        needyVentGasInput: {
          input,
        },
      });

      const newQuestion =
        res.needyVentGasInputResult?.needyVentGasState?.displayedQuestion;
      setDisplayedQuestion(newQuestion);
      const newCountdownStartedAt =
        res.needyVentGasInputResult?.needyVentGasState?.countdownStartedAt;
      setCountdownStartedAt(parseInt(newCountdownStartedAt || ""));
    },
    [sessionId, selectedBombId, selectedModuleId],
  );

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NeedyVentGasModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <group position={[0, 0.062, 0.042]} scale={[0.972, 0.972, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube063.geometry}
            material={materials["Plastic Dark"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube063_1.geometry}
            material={materials.CautionStrip}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TimerScreenNum.geometry}
            material={materials.Backlight}
            position={[0, -0.001, 0.003]}
            scale={1.202}
          >
            <Text {...COUNTDOWN_TEXT_ATTRS}>{remainingTimeSeconds}</Text>
          </mesh>
        </group>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VentGasScreenBase.geometry}
          material={materials["Metal.Brass"]}
          position={[0, -0.017, 0.033]}
          scale={[0.972, 0.972, 1]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.VentButtonN.geometry}
            material={materials["Vent.N"]}
            position={[0.011, -0.037, 0.012]}
            scale={1.252}
            ref={nButtonRef}
            onClick={onButtonClick}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.VentButtonY.geometry}
            material={materials["Vent.Y"]}
            position={[-0.011, -0.037, 0.012]}
            scale={1.252}
            ref={nButtonRef}
            onClick={onButtonClick}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.VentScreen.geometry}
            material={materials.Backlight}
            position={[0, 0.017, 0.01]}
          >
            <Text {...GREEN_TEXT_ATTRS}>
              {displayedQuestion?.toUpperCase()}
              {"\n"}
              Y/N
            </Text>
          </mesh>
        </mesh>
      </mesh>
    </Module>
  );
}
