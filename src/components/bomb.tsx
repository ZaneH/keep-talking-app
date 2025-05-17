import { Select, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "../hooks/use-game-store";
import { getModuleRoot } from "../utils/node-finder";
import { useControls } from "./controls-provider";
import BigButtonModule from "./modules/big-button-module";
import ClockModule from "./modules/clock-module";
import SimpleWiresModule from "./modules/simple-wires-module";

const ZOOM_DISTANCE = 0.2;

export default function Bomb() {
  const { nodes, materials } = useGLTF("/bomb.glb") as any;
  const { zoomToModule, selectedModuleId } = useGameStore();
  const controlsRef = useControls();

  function onModuleClick(selected: THREE.Object3D[]) {
    if (!selected || !selected[0]) return;

    const module = getModuleRoot(selected[0]);
    const moduleId = module.userData["id"];
    if (selectedModuleId === moduleId) {
      return;
    }

    const pos = module.getWorldPosition(new THREE.Vector3());
    const camControls = controlsRef.current;
    if (!camControls) return;

    // Zoom to the module
    zoomToModule(
      moduleId,
      new THREE.Vector3(pos.x, pos.y, pos.z + ZOOM_DISTANCE),
      camControls
    );
  }

  return (
    <>
      <group
        dispose={null}
        position={[0, 0.73, 0]}
        onPointerEnter={(e) => e.stopPropagation()}
      >
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
      <Select onChangePointerUp={onModuleClick}>
        <ClockModule />
        <BigButtonModule />
        <SimpleWiresModule />
      </Select>
    </>
  );
}
