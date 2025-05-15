import { Select, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { getModuleRoot } from "../utils/node-finder";
import { useControls } from "./controls-provider";
import BigButtonModule from "./modules/big-button-module";
import ClockModule from "./modules/clock-module";
import SimpleWiresModule from "./modules/simple-wires-module";

export default function Bomb() {
  const { nodes, materials } = useGLTF("/bomb.glb") as any;
  const controlsRef = useControls();

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
      <Select
        onChangePointerUp={(selected) => {
          if (!selected || !selected[0]) return;

          const module = getModuleRoot(selected[0]);
          const pos = module.getWorldPosition(new THREE.Vector3());

          const orbitalControls = controlsRef.current;

          if (!orbitalControls) return;

          orbitalControls.object.position.set(pos.x, pos.y + 0, pos.z + 0.1);
          orbitalControls.target.set(pos.x, pos.y, pos.z);
          orbitalControls.update();
        }}
      >
        <ClockModule />
        <BigButtonModule />
        <SimpleWiresModule />
      </Select>
    </>
  );
}

useGLTF.preload("/bomb.glb");
useGLTF.preload("/clock-module.glb");
useGLTF.preload("/big-button-module.glb");
useGLTF.preload("/simple-wires-module.glb");
