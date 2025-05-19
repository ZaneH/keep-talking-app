import { useRef } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type ModuleProps } from "./module";

export default function SimonSaysModule({ id = "simon-says" }: ModuleProps) {
  const { nodes, materials } = useModuleModel(id);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id, meshRef });

  return (
    <Module id={id} position={[-0.195, 0.827, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SimonSaysModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light003.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.011, 0.012, 0.011]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SimonSaysPatternD.geometry}
          material={materials.GreenLight}
          position={[0, -0.034, 0.032]}
          scale={[1.033, 1.033, 1.062]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SimonSaysPatternL.geometry}
          material={materials.RedLight}
          position={[-0.033, 0, 0.032]}
          scale={[1.033, 1.033, 1.062]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SimonSaysPatternR.geometry}
          material={materials.WireYellow}
          position={[0.033, 0, 0.032]}
          scale={[1.033, 1.033, 1.062]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SimonSaysPatternU.geometry}
          material={materials.BlueLight}
          position={[0, 0.034, 0.032]}
          scale={[1.033, 1.033, 1.062]}
        />
      </mesh>
    </Module>
  );
}
