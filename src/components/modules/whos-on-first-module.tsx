import { Text } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import { type WhosOnFirstState } from "../../generated/proto/whos_on_first_module.pb";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { useGuardedInput } from "../../hooks/use-module-input";
import { GameService } from "../../services/api";
import { getNamedRoot } from "../../utils/node-finder";
import { CustomMaterials } from "./custom-materials";
import Module, { type BaseModuleProps } from "./module";

const FONT_SIZE = 0.0125;
const FONT_COLOR = 0x000000;
const LETTER_SPACING = 0.01;
const BUTTON_TEXT_OFFSET = 0.0105;
const SCREEN_TEXT_OFFSET = 0.033;
const BUTTON_FONT_FAMILY = "/fonts/SairaExtraCondensed-SemiBold.ttf";
const SCREEN_FONT_FAMILY = "/fonts/Inter-Regular.ttf";
const SCREEN_FONT_SIZE = 0.014;

const TEXT_ATTRS = {
  fontSize: FONT_SIZE,
  color: FONT_COLOR,
  letterSpacing: LETTER_SPACING,
  font: BUTTON_FONT_FAMILY,
};

export default function WhosOnFirstModule({
  moduleId,
  name = "whos-on-first",
  position,
  state,
}: BaseModuleProps & {
  state?: WhosOnFirstState;
}) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const { sessionId, selectedBombId, selectedModuleId, updateBombFromStatus } = useGameStore();
  const { onPointerDown, guard } = useGuardedInput(moduleId);
  const [stage, setStage] = useState<number>(state?.stage || 1);
  const [screenWord, setScreenWord] = useState(state?.screenWord);
  const [buttons, setButtons] = useState(state?.buttonWords);
  const [isSolved, setIsSolved] = useState(false);

  const onWordClick = useCallback(
    async (event: ThreeEvent<MouseEvent>) => {
      const guarded = guard(() => {
        if (isSolved) return undefined;
        if (selectedModuleId !== moduleId) return undefined;
        if (!event.object) return undefined;
        return event.object;
      });
      if (guarded === undefined) return;

      const parent = getNamedRoot(guarded, "WOFButton");
      const word = parent?.userData.word;

      const res = await GameService.SendInput({
        sessionId: sessionId,
        bombId: selectedBombId,
        moduleId: selectedModuleId,
        whosOnFirstInput: {
          word: word,
        },
      });

      if (res.solved) {
        setIsSolved(true);
      } else {
        const newButtons =
          res.whosOnFirstInputResult?.whosOnFirstState?.buttonWords;
        const newScreenWord =
          res.whosOnFirstInputResult?.whosOnFirstState?.screenWord;
        setButtons(newButtons);
        setScreenWord(newScreenWord);
      }

      const newStage = res.whosOnFirstInputResult?.whosOnFirstState?.stage;
      setStage(newStage || 1);

      if (res.bombStatus?.strikeCount !== undefined && selectedBombId) {
        updateBombFromStatus(selectedBombId, res.bombStatus.strikeCount);
      }
    },
    [moduleId, selectedModuleId, sessionId, selectedBombId, isSolved, updateBombFromStatus, guard],
  );

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WhosOnFirstModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <group position={[-0.016, -0.022, 0.027]} scale={[0.972, 0.972, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.LTop.geometry}
            material={materials.TanButton}
            position={[-0.028, 0.032, 0]}
            onPointerDown={onPointerDown}
            onClick={onWordClick}
            name="WOFButton"
            userData={{
              word: buttons?.[0],
            }}
          >
            <Text {...TEXT_ATTRS} position={[0, 0, BUTTON_TEXT_OFFSET]}>
              {buttons?.[0]}
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RTop.geometry}
            material={materials.TanButton}
            position={[0.028, 0.032, 0]}
            onPointerDown={onPointerDown}
            onClick={onWordClick}
            name="WOFButton"
            userData={{
              word: buttons?.[1],
            }}
          >
            <Text {...TEXT_ATTRS} position={[0, 0, BUTTON_TEXT_OFFSET]}>
              {buttons?.[1]}
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.LMid.geometry}
            material={materials.TanButton}
            position={[-0.028, 0, 0]}
            onPointerDown={onPointerDown}
            onClick={onWordClick}
            name="WOFButton"
            userData={{
              word: buttons?.[2],
            }}
          >
            <Text {...TEXT_ATTRS} position={[0, 0, BUTTON_TEXT_OFFSET]}>
              {buttons?.[2]}
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RMid.geometry}
            material={materials.TanButton}
            position={[0.028, 0, 0]}
            onPointerDown={onPointerDown}
            onClick={onWordClick}
            name="WOFButton"
            userData={{
              word: buttons?.[3],
            }}
          >
            <Text {...TEXT_ATTRS} position={[0, 0, BUTTON_TEXT_OFFSET]}>
              {buttons?.[3]}
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.LBot.geometry}
            material={materials.TanButton}
            position={[-0.028, -0.032, 0]}
            onPointerDown={onPointerDown}
            onClick={onWordClick}
            name="WOFButton"
            userData={{
              word: buttons?.[4],
            }}
          >
            <Text {...TEXT_ATTRS} position={[0, 0, BUTTON_TEXT_OFFSET]}>
              {buttons?.[4]}
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RBot.geometry}
            material={materials.TanButton}
            position={[0.028, -0.032, 0]}
            onPointerDown={onPointerDown}
            onClick={onWordClick}
            name="WOFButton"
            userData={{
              word: buttons?.[5],
            }}
          >
            <Text {...TEXT_ATTRS} position={[0, 0, BUTTON_TEXT_OFFSET]}>
              {buttons?.[5]}
            </Text>
          </mesh>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.InputFrame.geometry}
          material={materials["Metal.Dark"]}
          position={[-0.016, -0.022, 0.031]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LCDFrame.geometry}
          material={materials["Metal.Dark"]}
          position={[-0.016, 0.055, 0.027]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LCDFrameBlack.geometry}
          material={materials.ScreenBlack}
          position={[-0.016, 0.055, 0.028]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LCDScreen.geometry}
          material={materials["Screen.Blue"]}
          position={[-0.016, 0.055, 0.029]}
          scale={[0.779, 0.486, 0.742]}
        />
        <Text
          fontSize={SCREEN_FONT_SIZE}
          position={[-0.016, 0.055, SCREEN_TEXT_OFFSET]}
          font={SCREEN_FONT_FAMILY}
        >
          {screenWord}
        </Text>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Steps.geometry}
          material={materials["Metal.Dark"]}
          scale={[0.972, 0.972, 1]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Step1Case.geometry}
            material={materials["Plastic.Black"]}
            position={[0.061, -0.045, 0.033]}
            scale={[-0.009, -0.008, -0.015]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step1Green.geometry}
              material={
                stage >= 2
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              position={[0.002, 0, -0.007]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[-105.334, -129.079, -68.463]}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Step2Case.geometry}
            material={materials["Plastic.Black"]}
            position={[0.061, -0.022, 0.033]}
            scale={[-0.009, -0.008, -0.015]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step2Green.geometry}
              material={
                stage >= 3
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              position={[0.002, 0, -0.007]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[-105.334, -129.079, -68.463]}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Step3Case.geometry}
            material={materials["Plastic.Black"]}
            position={[0.061, 0, 0.033]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.009, 0.008, 0.015]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step3Green.geometry}
              material={
                stage >= 4
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              position={[0, 0, -0.007]}
              scale={[105.334, 129.079, 68.463]}
            />
          </mesh>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light007.geometry}
          material={
            isSolved ? CustomMaterials.GreenLight : materials["Unlit light"]
          }
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.011, 0.012, 0.011]}
        />
      </mesh>
    </Module>
  );
}
