import { useGLTF } from "@react-three/drei";
// import { materials } from "./materials";

export default function Bomb() {
  const { nodes, materials } = useGLTF("/bomb.glb") as any;

  return (
    <group dispose={null} position={[0, 0.73, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WiresModule.geometry}
        material={materials.Silver}
        position={[0.197, -0.101, 0.074]}
        scale={[1.028, 1.028, 1]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BigStrip.geometry}
          material={materials["Plastic Dark"]}
          position={[-0.055, 0.052, 0.021]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug1.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, 0.002, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.019, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.041, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.062, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5.geometry}
            material={materials["Plastic Light"]}
            position={[0.001, -0.084, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6.geometry}
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
          position={[0.031, 0.052, 0.021]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug1001.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.017, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2001.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.035, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3001.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.052, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4001.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.07, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5001.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.088, 0.013]}
            rotation={[0, 0, Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6001.geometry}
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
          material={nodes.Wire1.material}
          position={[-0.008, 0.04, 0.037]}
          rotation={[-Math.PI, 0, 0.243]}
          scale={0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire2.geometry}
          material={nodes.Wire2.material}
          position={[-0.008, 0.023, 0.037]}
          rotation={[-Math.PI, 0, 0.243]}
          scale={0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire3.geometry}
          material={nodes.Wire3.material}
          position={[-0.008, 0.006, 0.037]}
          rotation={[-Math.PI, 0, 0.243]}
          scale={0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire4.geometry}
          material={nodes.Wire4.material}
          position={[-0.008, -0.033, 0.037]}
          rotation={[-Math.PI, 0, 0.243]}
          scale={0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire5.geometry}
          material={nodes.Wire5.material}
          position={[-0.008, -0.016, 0.037]}
          rotation={[-Math.PI, 0, 0.243]}
          scale={0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wire6.geometry}
          material={nodes.Wire6.material}
          position={[-0.008, -0.053, 0.037]}
          rotation={[-Math.PI, 0, 0.243]}
          scale={0.05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light.geometry}
          material={materials["Solved light"]}
          position={[0.059, 0.058, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.012}
        />
      </mesh>
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
            position={[0, 0.732, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.H001.geometry}
            material={materials.Silver}
            position={[0, 0.732, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.H002.geometry}
            material={materials.Silver}
            position={[0.001, 0.732, 0]}
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonModule.geometry}
        material={materials.Silver}
        position={[-0.001, -0.101, 0.074]}
        scale={[1.028, 1.028, 1]}
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
          geometry={nodes.Light001.geometry}
          material={materials["Unlit light"]}
          position={[0.054, 0.057, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.011, 0.012, 0.011]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Clock.geometry}
        material={materials["Silver Dark"]}
        position={[-0.197, -0.101, 0.074]}
        scale={[1.028, 1.028, 1]}
      />
    </group>
  );
}

useGLTF.preload("/bomb.glb");
