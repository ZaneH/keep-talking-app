import { useRef } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type ModuleProps } from "./module";

export default function KeypadModule({ id = "keypad" }: ModuleProps) {
  const { nodes, materials } = useModuleModel(id);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id, meshRef });

  return (
    <Module id={id} position={[0.195, 0.827, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KeypadModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternBL.geometry}
          material={materials.TanButton}
          position={[-0.044, -0.044, 0.032]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternBLImage.geometry}
          material={nodes.KeypadPatternBLImage.material}
          position={[0.017, -0.044, 0.033]}
          scale={[0.642, 0.642, 0.66]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternBRImage.geometry}
          material={nodes.KeypadPatternBRImage.material}
          position={[-0.044, -0.044, 0.033]}
          scale={[0.642, 0.642, 0.66]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternTLImage.geometry}
          material={nodes.KeypadPatternTLImage.material}
          position={[-0.044, 0.017, 0.033]}
          scale={[0.642, 0.642, 0.66]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternTRImage.geometry}
          material={nodes.KeypadPatternTRImage.material}
          position={[0.017, 0.017, 0.033]}
          scale={[0.642, 0.642, 0.66]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternBR.geometry}
          material={materials.TanButton}
          position={[0.017, -0.044, 0.032]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternTL.geometry}
          material={materials.TanButton}
          position={[-0.044, 0.017, 0.032]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternTR.geometry}
          material={materials.TanButton}
          position={[0.017, 0.017, 0.032]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitBL.geometry}
          material={materials["Backlight.Dark"]}
          position={[-0.044, -0.064, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitBR.geometry}
          material={materials["Backlight.Dark"]}
          position={[0.018, -0.064, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitTL.geometry}
          material={materials["Backlight.Dark"]}
          position={[-0.044, -0.003, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitTR.geometry}
          material={materials["Backlight.Dark"]}
          position={[0.018, -0.003, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light006.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}
