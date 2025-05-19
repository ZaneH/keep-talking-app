import { Text } from "@react-three/drei";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type ModuleProps } from "./module";
import { useRef } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";

function TextLabel() {
  return (
    <Text
      fontSize={0.05}
      position={[0, 0.033, 0.034]}
      color={"green"}
      font="/fonts/Seven_Segment.ttf"
    >
      00:00
      <meshStandardMaterial
        emissive={"green"}
        emissiveIntensity={3.5}
        color={"green"}
      />
    </Text>
  );
}

export default function ClockModule({ id = "clock" }: ModuleProps) {
  const { nodes, materials } = useModuleModel(id);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id, meshRef });

  return (
    <Module id={id} position={[0, 0.629, 0.1]}>
      <TextLabel />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ClockModule_1.geometry}
        material={materials["Silver Dark"]}
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
            scale={[0.856, 0.856, 1.208]}
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
            scale={0.844}
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
