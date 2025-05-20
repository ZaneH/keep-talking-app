import { useRef } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type ModuleProps } from "./module";

export default function SimonSaysModule({ name = "simon-says" }: ModuleProps) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: name, meshRef });

  return (
    <Module id={name} position={[-0.195, 0.827, 0.1]}>
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
          geometry={nodes.SimonSaysPatternD.geometry}
          material={materials.GreenLight}
          position={[0, -0.035, 0.032]}
          scale={1.062}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SimonSaysPatternL.geometry}
          material={materials.RedLight}
          position={[-0.034, 0, 0.032]}
          scale={1.062}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SimonSaysPatternR.geometry}
          material={materials.YellowLight}
          position={[0.034, 0, 0.032]}
          scale={1.062}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SimonSaysPatternU.geometry}
          material={materials.BlueLight}
          position={[0, 0.035, 0.032]}
          scale={1.062}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light003.geometry}
          material={materials["Unlit light"]}
          position={[0.062, 0.064, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </mesh>
    </Module>
  );
}
