import { Select, useGLTF } from "@react-three/drei";
import ClockModule from "./modules/clock";
import BigButtonModule from "./modules/big-button-module";
import SimpleWiresModule from "./modules/simple-wires-module";
// import { materials } from "./materials";

export default function Bomb() {
  const { nodes, materials } = useGLTF("/bomb.glb") as any;

  return (
    <>
      <group dispose={null} position={[0, 0.73, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Case.geometry}
          material={materials.Silver}
          scale={[0.911, 1, 1]}
        >
          <group position={[0, -0.732, 0]} scale={[1.098, 1, 1]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.H.geometry}
              material={materials.Silver}
              position={[0, 0.73, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.H001.geometry}
              material={materials.Silver}
              position={[0, 0.73, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.H002.geometry}
              material={materials.Silver}
              position={[0.001, 0.73, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.V.geometry}
              material={materials.Silver}
              position={[0.005, 0.732, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.V003.geometry}
              material={materials.Silver}
              position={[-0.007, 0.732, 0]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Backplate.geometry}
            material={materials.Silver}
            scale={[1.098, 1, 1]}
          />
        </mesh>
      </group>
      <Select>
        <ClockModule />
        <BigButtonModule />
        <SimpleWiresModule />
      </Select>
    </>
  );
}

useGLTF.preload("/bomb.glb");
