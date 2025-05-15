import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useHighlight } from "../highlight-provider";
import Module from "./module";

export default function SimpleWiresModule() {
  const { nodes, materials } = useGLTF("/simple-wires.glb") as any;
  const { highlight, unhighlight } = useHighlight();
  const outlineRef = useRef(null);

  return (
    <Module position={[-0.195, 0.629, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WiresModule001.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={outlineRef}
        onPointerEnter={() => {
          highlight(outlineRef);
        }}
        onPointerLeave={() => {
          unhighlight(outlineRef);
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BigStrip.geometry}
          material={materials["Plastic Dark"]}
          position={[0.051, -0.055, 0.021]}
          rotation={[-Math.PI, 0, Math.PI / 2]}
          scale={-1}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug1003.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, 0.002, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2003.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.019, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3003.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.041, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4003.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.062, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5003.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.084, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6003.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.105, 0.013]}
            scale={0.482}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallStrip.geometry}
          material={materials["Plastic Dark"]}
          position={[0.051, 0.031, 0.021]}
          rotation={[-Math.PI, 0, Math.PI / 2]}
          scale={-1}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug1002.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.017, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2002.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.035, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3002.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.052, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4002.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.07, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5002.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.088, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6002.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.105, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire1.geometry}
          material={materials.WireRed}
          position={[0.04, -0.008, 0.037]}
          rotation={[0, 0, -1.328]}
          scale={-0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire2.geometry}
          material={materials.WireYellow}
          position={[0.023, -0.008, 0.037]}
          rotation={[0, 0, -1.328]}
          scale={-0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire3.geometry}
          material={materials.BlueWire}
          position={[0.006, -0.008, 0.037]}
          rotation={[0, 0, -1.328]}
          scale={-0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire4.geometry}
          material={materials.PinkWire}
          position={[-0.034, -0.008, 0.037]}
          rotation={[0, 0, -1.328]}
          scale={-0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire5.geometry}
          material={materials.BlackWire}
          position={[-0.016, -0.008, 0.037]}
          rotation={[0, 0, -1.328]}
          scale={-0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire6.geometry}
          material={materials.OrangeWire}
          position={[-0.053, -0.008, 0.037]}
          rotation={[0, 0, -1.328]}
          scale={-0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light002.geometry}
          material={materials["Solved light"]}
          position={[0.059, 0.058, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.012}
        />
      </mesh>
    </Module>
  );
}
