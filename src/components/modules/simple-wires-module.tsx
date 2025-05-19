import { Select } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { useHighlight } from "../highlight-provider";
import { InteractiveMesh } from "../interactive-mesh";
import Module, { type ModuleProps } from "./module";

export default function SimpleWiresModule({
  id = "simple-wires",
}: ModuleProps) {
  const { nodes, materials } = useModuleModel(id);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id, meshRef });

  const [cutWires, setCutWires] = useState([false, false, false, false, false]);

  return (
    <Module id={id} position={[-0.195, 0.629, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WiresModule.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
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
            geometry={nodes.Plug1001.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, 0.002, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2001.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.019, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3001.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.041, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4001.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.062, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5001.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.084, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6001.geometry}
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
            geometry={nodes.Plug1.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.017, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.035, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.052, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.07, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.088, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.105, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
        </mesh>
        <Select
          onChangePointerUp={(selected) => {
            // if (selected.length > 0 && !cutWire6) {
            //   setCutWire6(true);
            // }
          }}
        >
          <group>
            <CuttableWire
              isCut={cutWires[0]}
              uncutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire1Normal.geometry}
                  material={materials.WireRed}
                  position={[0.04, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
              cutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire1Cut.geometry}
                  material={materials.WireRed}
                  position={[0.04, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
            />

            <CuttableWire
              isCut={cutWires[1]}
              uncutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire2Normal.geometry}
                  material={materials.WireYellow}
                  position={[0.023, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
              cutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire2Cut.geometry}
                  material={materials.WireYellow}
                  position={[0.023, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
            />

            <CuttableWire
              isCut={cutWires[2]}
              uncutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire3Normal.geometry}
                  material={materials.BlueWire}
                  position={[0.006, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
              cutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire3Cut.geometry}
                  material={materials.BlueWire}
                  position={[0.006, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
            />

            <CuttableWire
              isCut={cutWires[3]}
              uncutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire4Normal.geometry}
                  material={materials.BlackWire}
                  position={[-0.016, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
              cutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire4Cut.geometry}
                  material={materials.BlackWire}
                  position={[-0.016, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
            />

            <CuttableWire
              isCut={cutWires[4]}
              uncutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire5Normal.geometry}
                  material={materials.PinkWire}
                  position={[-0.034, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
              cutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire5Cut.geometry}
                  material={materials.PinkWire}
                  position={[-0.034, -0.008, 0.037]}
                  rotation={[Math.PI, 0, -1.36]}
                  scale={0.05}
                />
              }
            />
            <CuttableWire
              isCut={cutWires[5]}
              uncutWire={
                <InteractiveMesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire6Normal.geometry}
                  material={materials.OrangeWire}
                  position={[-0.057, -0.011, 0.05]}
                />
              }
              cutWire={
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Wire6Cut.geometry}
                  material={materials.OrangeWire}
                  position={[-0.057, -0.011, 0.05]}
                />
              }
            />
          </group>
        </Select>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light002.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}

const CuttableWire = ({
  uncutWire,
  cutWire,
  isCut,
}: {
  uncutWire: React.ReactNode;
  cutWire: React.ReactNode;
  isCut: boolean;
}) => {
  const wireRef = useRef<THREE.Mesh>(null);
  const { unhighlight } = useHighlight();

  useEffect(() => {
    if (isCut) {
      unhighlight(wireRef);
    }
  }, [isCut, unhighlight]);

  return (
    <group>
      {isCut ? (
        <mesh {...(cutWire as any).props} ref={wireRef} />
      ) : (
        <InteractiveMesh {...(uncutWire as any).props} ref={wireRef} />
      )}
    </group>
  );
};
