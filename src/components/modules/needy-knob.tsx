import { Text } from "@react-three/drei";
import { type ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { NeedyKnobState } from "../../generated/proto/needy_knob_module.pb";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { GameService } from "../../services/api";
import type { BaseModuleProps } from "./module";
import Module from "./module";
import { CardinalDirection } from "../../generated/proto/common.pb";
import { CustomMaterials } from "./custom-materials";

// const TEXT_Y_OFFSET = 0.003;
// const GREEN_TEXT_OFFSET = 0.001;
const RED_TEXT_OFFSET = 0.003;

// const GREEN_FONT_SIZE = 0.0125;
const RED_FONT_SIZE = 0.015;

// const GREEN_FONT_FAMILY = "/fonts/Inter-Medium.ttf";
const RED_FONT_FAMILY = "/fonts/Digital7_Mono.ttf";

// const GREEN_FONT_COLOR = 0x5b8c45;
const RED_FONT_COLOR = 0x9e3029;

// const GREEN_TEXT_ATTRS = {
//   fontSize: GREEN_FONT_SIZE,
//   font: GREEN_FONT_FAMILY,
//   color: GREEN_FONT_COLOR,
//   position: [0, TEXT_Y_OFFSET, GREEN_TEXT_OFFSET] as [number, number, number],
//   textAlign: "center" as any,
// };

const COUNTDOWN_TEXT_ATTRS = {
  fontSize: RED_FONT_SIZE,
  font: RED_FONT_FAMILY,
  color: RED_FONT_COLOR,
  position: [0, 0, RED_TEXT_OFFSET] as [number, number, number],
  textAlign: "center" as any,
};

export default function NeedyKnobModule({
  moduleId,
  name = "needy-knob",
  position,
  state,
}: BaseModuleProps & {
  state?: NeedyKnobState;
}) {
  const { selectedBombId, selectedModuleId, sessionId } = useGameStore();
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const [countdownStartedAt, setCountdownStartedAt] = useState<
    number | undefined
  >(Number(state?.countdownStartedAt));
  const [displayedPatternFirstRow] = useState<boolean[] | undefined>(
    state?.displayedPatternFirstRow,
  );
  const [displayedPatternSecondRow] = useState<boolean[] | undefined>(
    state?.displayedPatternSecondRow,
  );
  const [dialDirection, setDialDirection] = useState<
    CardinalDirection | undefined
  >(state?.dialDirection);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const dialRotation = useMemo(() => {
    if (dialDirection === CardinalDirection.UP) {
      return 0;
    } else if (dialDirection === CardinalDirection.RIGHT) {
      return -Math.PI / 2;
    } else if (dialDirection === CardinalDirection.DOWN) {
      return Math.PI;
    } else if (dialDirection === CardinalDirection.LEFT) {
      return Math.PI / 2;
    }

    return 0;
  }, [dialDirection]);

  const dialRef = useRef<any>(null);

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

  const onDialClick = useCallback(
    async (_e: ThreeEvent<MouseEvent>) => {
      if (selectedModuleId !== moduleId) return;

      const res = await GameService.SendInput({
        sessionId,
        bombId: selectedBombId,
        moduleId,
        needyKnobInput: {
          input: {},
        },
      });

      const newCountdownStartedAt =
        res.needyKnobInputResult?.needyKnobState?.countdownStartedAt;
      setCountdownStartedAt(parseInt(newCountdownStartedAt || ""));
      const newDialDirection =
        res.needyKnobInputResult?.needyKnobState?.dialDirection;
      setDialDirection(newDialDirection);
    },
    [sessionId, selectedBombId, selectedModuleId],
  );

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NeedyKnobModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KnobShellOuter.geometry}
          material={materials["Silver.Dark"]}
          position={[0, -0.01, 0.032]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.075, 0.078, 0.075]}
        >
          <group
            position={[0, -0.011, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={12.889}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["01Light"].geometry}
              material={
                displayedPatternFirstRow?.[0]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[-0.05, -0.021, 0.005]}
              rotation={[Math.PI / 2, -1.178, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED1Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[1.344, -0.039, -1.405]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["02Light"].geometry}
              material={
                displayedPatternFirstRow?.[1]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[-0.038, -0.039, 0.005]}
              rotation={[Math.PI / 2, -Math.PI / 4, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED2Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[0.92, -0.104, -1.436]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["03Light"].geometry}
              material={
                displayedPatternFirstRow?.[2]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[-0.021, -0.05, 0.005]}
              rotation={[Math.PI / 2, -Math.PI / 8, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED3Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[0.467, -0.153, -1.496]}
                scale={89.585}
              />
            </mesh>
          </group>
          <group
            position={[0, -0.011, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={12.889}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["07Light"].geometry}
              material={
                displayedPatternSecondRow?.[0]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[-0.064, -0.027, 0.002]}
              rotation={[Math.PI / 2, -1.178, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED7Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[1.344, -0.039, -1.405]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["08Light"].geometry}
              material={
                displayedPatternSecondRow?.[1]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[-0.049, -0.049, 0.002]}
              rotation={[Math.PI / 2, -Math.PI / 4, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED8Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[0.921, -0.104, -1.435]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["09Light"].geometry}
              material={
                displayedPatternSecondRow?.[2]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[-0.026, -0.064, 0.002]}
              rotation={[Math.PI / 2, -Math.PI / 8, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED9Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[0.467, -0.153, -1.496]}
                scale={89.585}
              />
            </mesh>
          </group>
          <group
            position={[0, -0.011, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={12.889}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["04Light"].geometry}
              material={
                displayedPatternFirstRow?.[3]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[0.021, -0.05, 0.005]}
              rotation={[Math.PI / 2, Math.PI / 8, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED4Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[-0.471, -0.152, -1.649]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["05Light"].geometry}
              material={
                displayedPatternFirstRow?.[4]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[0.039, -0.038, 0.005]}
              rotation={[Math.PI / 2, Math.PI / 4, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED5Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[-0.922, -0.101, -1.708]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["06Light"].geometry}
              material={
                displayedPatternFirstRow?.[5]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[0.051, -0.02, 0.005]}
              rotation={[Math.PI / 2, 1.178, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED6Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[-1.344, -0.035, -1.737]}
                scale={89.585}
              />
            </mesh>
          </group>
          <group
            position={[0, -0.011, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={12.889}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["10Light"].geometry}
              material={
                displayedPatternSecondRow?.[3]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[0.027, -0.064, 0.002]}
              rotation={[Math.PI / 2, Math.PI / 8, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED10Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[-0.47, -0.152, -1.648]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["11Light"].geometry}
              material={
                displayedPatternSecondRow?.[4]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[0.049, -0.048, 0.002]}
              rotation={[Math.PI / 2, Math.PI / 4, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED11Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[-0.922, -0.102, -1.707]}
                scale={89.585}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["12Light"].geometry}
              material={
                displayedPatternSecondRow?.[5]
                  ? CustomMaterials.GreenLight
                  : materials["GreenLight.Unlit"]
              }
              position={[0.064, -0.026, 0.002]}
              rotation={[Math.PI / 2, 1.178, Math.PI / 2]}
              scale={0.005}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.LED12Ring.geometry}
                material={materials["Plastic Dark"]}
                rotation={[-1.344, -0.035, -1.737]}
                scale={89.585}
              />
            </mesh>
          </group>
          <group position={[0, -0.011, 0]} scale={1.036}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh001.geometry}
              material={materials.Silver}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_1.geometry}
              material={materials["Plastic.Black"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Dial.geometry}
              material={materials["Plastic.Red"]}
              position={[0, 0.108, -0.004]}
              rotation={[0, dialRotation, 0]}
              scale={0.183}
              ref={dialRef}
              onClick={onDialClick}
            />
          </group>
        </mesh>
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
      </mesh>
    </Module>
  );
}
