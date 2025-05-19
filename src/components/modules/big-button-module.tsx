import { useRef } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type ModuleProps } from "./module";

export default function BigButtonModule({ id = "big-button" }: ModuleProps) {
  const { nodes, materials } = useModuleModel(id);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id, meshRef });

  return (
    <Module id={id} position={[0.195, 0.629, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonModule.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <group position={[0.002, 0.096, -0.074]} scale={[0.943, 0.943, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ButtonHead.geometry}
            material={materials["Button Red"]}
            position={[0, -0.108, 0.127]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.043, 0.006, 0.043]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ButtonShaft.geometry}
            material={materials["Button Red"]}
            position={[0, -0.108, 0.113]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.032, 0.011, 0.032]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cover.geometry}
          material={materials.ClearPlastic}
          position={[0, 0.079, 0.031]}
          scale={[0.077, 0.077, 0.079]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hinge.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0.077, 0.033]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.003, 0.015, 0.003]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightRing.geometry}
          material={materials["Unlit light"]}
          position={[0.002, -0.007, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.425, 1.466, 1.425]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light005.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.011, 0.012, 0.011]}
        />
      </mesh>
    </Module>
  );
}
