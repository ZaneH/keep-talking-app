import { Text } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import { type MemoryState } from "../../generated/proto/memory_module.pb";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { GameService } from "../../services/api";
import { getNamedRoot } from "../../utils/node-finder";
import { CustomMaterials } from "./custom-materials";
import Module, { type BaseModuleProps } from "./module";

const CHOICE_FONT_SIZE = 0.0225;
const BUTTON_TEXT_OFFSET = 0.0105;
const SCREEN_TEXT_OFFSET = 0.011;
const CHOICE_FONT_FAMILY = "/fonts/SairaExtraCondensed-SemiBold.ttf";
const SCREEN_FONT_FAMILY = "/fonts/Inter-Regular.ttf";
const SCREEN_FONT_SIZE = 0.03;

const SCREEN_FONT_ATTRS = {
  fontSize: SCREEN_FONT_SIZE,
  color: 0xffffff,
  font: SCREEN_FONT_FAMILY,
};

const CHOICE_LABEL_ATTRS = {
  fontSize: CHOICE_FONT_SIZE,
  color: 0x000000,
  font: CHOICE_FONT_FAMILY,
};

export default function MemoryModule({
  moduleId,
  name = "memory",
  position,
  state,
}: BaseModuleProps & {
  state?: MemoryState;
}) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const { sessionId, selectedBombId, selectedModuleId } = useGameStore();
  const [stage, setStage] = useState<number>(state?.stage || 1);
  const [screenWord, setScreenWord] = useState(state?.screenNumber);
  const [buttons, setButtons] = useState(state?.displayedNumbers);
  const [isSolved, setIsSolved] = useState(false);

  const onButtonClick = useCallback(
    async (event: ThreeEvent<MouseEvent>) => {
      if (isSolved) return;
      if (selectedModuleId !== moduleId) return;
      if (!event.object) return;

      const parent = getNamedRoot(event.object, "MemoryButton");
      const buttonIndex = parent?.userData.buttonIndex;

      const res = await GameService.SendInput({
        sessionId: sessionId,
        bombId: selectedBombId,
        moduleId: selectedModuleId,
        memoryInput: {
          buttonIndex,
        },
      });

      if (res.solved) {
        setIsSolved(true);
      } else {
        const newButtons = res.memoryInputResult?.memoryState?.displayedNumbers;
        const newScreenNumber =
          res.memoryInputResult?.memoryState?.screenNumber;
        setButtons(newButtons);
        setScreenWord(newScreenNumber);
      }

      const newStage = res?.memoryInputResult?.memoryState?.stage;
      setStage(newStage || 1);
    },
    [moduleId, selectedModuleId, sessionId, selectedBombId, isSolved],
  );

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MemoryModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MemoryChoicesFrame.geometry}
          material={materials["Metal.Dark"]}
          position={[-0.016, -0.046, 0.031]}
          scale={[0.972, 0.972, 1]}
        >
          <group position={[0, 0, -0.003]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MemoryC1.geometry}
              material={materials.TanButton}
              position={[-0.042, 0, 0]}
              onClick={onButtonClick}
              name="MemoryButton"
              userData={{
                buttonIndex: 0,
              }}
            >
              <Text
                {...CHOICE_LABEL_ATTRS}
                position={[0, 0, BUTTON_TEXT_OFFSET]}
              >
                {buttons?.[0]}
              </Text>
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MemoryC2.geometry}
              material={materials.TanButton}
              position={[-0.014, 0, 0]}
              onClick={onButtonClick}
              name="MemoryButton"
              userData={{
                buttonIndex: 1,
              }}
            >
              <Text
                {...CHOICE_LABEL_ATTRS}
                position={[0, 0, BUTTON_TEXT_OFFSET]}
              >
                {buttons?.[1]}
              </Text>
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MemoryC3.geometry}
              material={materials.TanButton}
              position={[0.014, 0, 0]}
              onClick={onButtonClick}
              name="MemoryButton"
              userData={{
                buttonIndex: 2,
              }}
            >
              <Text
                {...CHOICE_LABEL_ATTRS}
                position={[0, 0, BUTTON_TEXT_OFFSET]}
              >
                {buttons?.[2]}
              </Text>
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MemoryC4.geometry}
              material={materials.TanButton}
              position={[0.042, 0, 0]}
              onClick={onButtonClick}
              name="MemoryButton"
              userData={{
                buttonIndex: 3,
              }}
            >
              <Text
                {...CHOICE_LABEL_ATTRS}
                position={[0, 0, BUTTON_TEXT_OFFSET]}
              >
                {buttons?.[3]}
              </Text>
            </mesh>
          </group>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MemoryChrome.geometry}
          material={materials["Metal.Dark"]}
          position={[-0.016, 0.029, 0.027]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MemoryScreen.geometry}
          material={materials["Screen.Blue"]}
          position={[-0.015, 0.028, 0.026]}
          scale={[0.776, 0.776, 1]}
        >
          <Text
            {...SCREEN_FONT_ATTRS}
            font={SCREEN_FONT_FAMILY}
            position={[0, 0, SCREEN_TEXT_OFFSET]}
          >
            {screenWord}
          </Text>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MemoryScreenBorder.geometry}
          material={materials["Metal.Dark"]}
          position={[-0.015, 0.029, 0.031]}
          scale={[0.883, 0.883, 0.908]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials["Metal.Dark"]}
            position={[0.017, -0.033, -0.034]}
            scale={1.101}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MemoryStagesBar.geometry}
          material={materials["Metal.Dark"]}
          position={[0.059, -0.02, 0.027]}
          scale={[0.972, 1.049, 1]}
        >
          <group position={[0, 0, 0.005]} scale={[1, 0.927, 1]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step1Case001.geometry}
              material={
                stage >= 2
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              position={[0, -0.045, 0]}
              scale={[-0.009, -0.008, -0.015]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step2Case001.geometry}
              material={
                stage >= 3
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              position={[0, -0.022, 0]}
              scale={[-0.009, -0.008, -0.015]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step3Case001.geometry}
              material={
                stage >= 4
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              scale={[-0.009, -0.008, -0.015]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step4Case001.geometry}
              material={
                stage >= 5
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              position={[0, 0.022, 0]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={[0.009, 0.008, 0.015]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Step5Case001.geometry}
              material={
                stage >= 6 || isSolved
                  ? CustomMaterials.GreenLight
                  : materials["Plastic.Black"]
              }
              position={[0, 0.045, 0]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={[0.009, 0.008, 0.015]}
            />
          </group>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light008.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}
