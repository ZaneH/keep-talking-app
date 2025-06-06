import { Text } from "@react-three/drei";
import { useRef, useState } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { useBomb } from "../bomb-context";
import Module, { type BaseModuleProps } from "./module";
import { useFrame } from "@react-three/fiber";

const SCREEN_OFFSET = 0.035;

function TextLabel() {
  const { startedAt, timerDuration } = useBomb();
  const [timeString, setTimeString] = useState("05:00");

  useFrame(() => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = Math.max((startedAt ?? 0) + (timerDuration ?? 0) - now, 0);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    const newTimeString = `${minutes}:${seconds}`;

    if (newTimeString !== timeString) {
      setTimeString(newTimeString);
    }
  });

  return (
    <Text
      fontSize={0.05}
      position={[0, 0.0372, SCREEN_OFFSET]}
      color={"green"}
      font="/fonts/Digital7_Mono.ttf"
    >
      {timeString}
      <meshStandardMaterial
        emissive={"green"}
        emissiveIntensity={3.5}
        color={"green"}
      />
    </Text>
  );
}

export default function ClockModule({
  moduleId,
  name = "clock",
  position,
}: BaseModuleProps) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: name, meshRef });

  return (
    <Module id={moduleId} position={position}>
      <TextLabel />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ClockModule_1.geometry}
        material={materials["Silver.Dark"]}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <group position={[0.191, 0.099, -0.074]} scale={[0.972, 0.972, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ClockBacklight.geometry}
            material={materials.Backlight}
            position={[-0.196, -0.066, 0.077]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ClockFrame.geometry}
            material={materials["Plastic Dark"]}
            position={[-0.196, -0.066, 0.084]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Speaker.geometry}
            material={materials["Plastic Dark"]}
            position={[-0.137, -0.144, 0.085]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.HoleBGC.geometry}
              material={materials.HoleCuts}
              position={[0, 0, 0.03]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.009}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.HoleBGL.geometry}
              material={materials.HoleCuts}
              position={[0, 0, 0.03]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.02}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.HoleBGS.geometry}
              material={materials.HoleCuts}
              position={[0, 0, 0.03]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.009}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.XFrameBacklight.geometry}
            material={materials.Backlight}
            position={[-0.223, -0.144, 0.083]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.XFrameFrame.geometry}
            material={materials["Plastic Dark"]}
            position={[-0.223, -0.144, 0.084]}
          />
        </group>
      </mesh>
    </Module>
  );
}
