import { useRef } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import type { ModuleProps } from "./module";
import Module from "./module";

export default function PasswordModule({ name = "password" }: ModuleProps) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: name, meshRef });

  return (
    <Module id={name} position={[0, 0.827, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PasswordModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Backlight.geometry}
          material={materials.Backlight}
          position={[0, 0, 0.004]}
          scale={[0.948, 0.918, 0.944]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button1.geometry}
          material={materials.TanButton}
          position={[-0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button2.geometry}
          material={materials.TanButton}
          position={[-0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button3.geometry}
          material={materials.TanButton}
          position={[0, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button4.geometry}
          material={materials.TanButton}
          position={[0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button5.geometry}
          material={materials.TanButton}
          position={[0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Divider001.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0, 0.003]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Divider002.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0, 0.003]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Divider003.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0, 0.003]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Divider004.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0, 0.003]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LCDFrame001.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0, 0.012]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SubmitButton.geometry}
          material={materials.TanButton}
          position={[0, -0.061, 0.02]}
          scale={[1.015, 1.015, 1.044]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SubmitFrame.geometry}
          material={materials["Silver Dark"]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light001.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}
