import { Text, useGLTF, useSelect } from "@react-three/drei";

export default function ClockModule() {
  const { nodes, materials } = useGLTF("/clock-module.glb") as any;
  const selected = useSelect();
  console.log(selected);

  return (
    <group position={[0, 0.629, 0.1]}>
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ClockModule001.geometry}
        material={materials["Silver Dark.001"]}
        scale={[1.028, 1.028, 1]}
      >
        <group position={[0.191, 0.099, -0.074]} scale={[0.972, 0.972, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ClockBacklight.geometry}
            material={materials["Backlight.001"]}
            position={[-0.196, -0.066, 0.077]}
            scale={[0.856, 0.856, 1.208]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ClockFrame.geometry}
            material={materials["Plastic Dark.004"]}
            position={[-0.196, -0.066, 0.084]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Speaker.geometry}
            material={materials["Plastic Dark.004"]}
            position={[-0.137, -0.144, 0.085]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.HoleBGL.geometry}
              material={materials["HoleCuts.001"]}
              position={[0, 0, 0.029]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.02}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.HoleBGS.geometry}
              material={materials["HoleCuts.001"]}
              position={[0, 0, 0.03]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.009}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.XFrameBacklight.geometry}
            material={materials["Backlight.001"]}
            position={[-0.223, -0.144, 0.083]}
            scale={0.844}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.XFrameFrame.geometry}
            material={materials["Plastic Dark.004"]}
            position={[-0.223, -0.144, 0.084]}
          />
        </group>
      </mesh>
    </group>
  );
}
