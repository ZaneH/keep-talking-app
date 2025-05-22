import { Select, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "../hooks/use-game-store";
import { getModuleRoot } from "../utils/node-finder";
import { useControls } from "./controls-provider";
import {
  BigButtonModule,
  ClockModule,
  SimonSaysModule,
  SimpleWiresModule,
} from "./modules";
import { ModuleModuleType, type Module } from "../generated/proto/modules.pb";

const ZOOM_DISTANCE = 0.2;

interface BombProps {
  bombId?: string;
  modules?: { [key: string]: Module };
}

export default function Bomb({ bombId: _bombId, modules }: BombProps) {
  const { nodes, materials } = useGLTF("/bomb.glb") as any;
  const { zoomToModule, selectedModuleId } = useGameStore();
  const controlsRef = useControls();

  function onModuleClick(selected: THREE.Object3D[]) {
    if (!selected || !selected[0]) return;

    const module = getModuleRoot(selected[0]);
    const moduleId = module.userData["moduleId"];
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
        name="Shell"
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
        {Object.entries(modules || {}).map(([moduleId, module]) => {
          return renderModule(moduleId, module);
        })}
      </Select>
    </>
  );
}

function renderModule(key?: string, module?: Module) {
  switch (module?.type) {
    case ModuleModuleType.BIG_BUTTON:
      return (
        <BigButtonModule
          key={key}
          moduleId={module.id!}
          state={module.bigButton}
        />
      );
    case ModuleModuleType.SIMPLE_WIRES:
      return (
        <SimpleWiresModule
          key={key}
          moduleId={module.id!}
          state={module.simpleWires}
        />
      );
    case ModuleModuleType.CLOCK:
      return <ClockModule key={key} moduleId={module.id!} />;
    // case Module_ModuleType.KEYPAD:
    //   return <KeypadModule />;
    // case ModuleModuleType.SIMON_SAYS:
    //   return <SimonSaysModule key={key} moduleId={module.id!} />;
    default:
      return null;
  }
}
