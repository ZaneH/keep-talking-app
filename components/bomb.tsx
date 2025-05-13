import { useGLTF } from "@react-three/drei";
import { materials } from "./materials";

export default function Bomb() {
  const { nodes, scene } = useGLTF("./bomb.glb") as any;
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group dispose={null} position={[0, 0.75, 0]}>
      <mesh
        geometry={nodes.Cube029.geometry}
        material={materials.Silver}
        castShadow
      />
      <mesh
        geometry={nodes.Cube029_1.geometry}
        material={materials["Darker Orange"]}
        castShadow
      />
      <group position={[0, -0.733, 0]}>
        <mesh geometry={nodes.Cube016.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube017.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube018.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube019.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube020.geometry} material={materials.Silver} />
      </group>
      <group position={[0, -0.733, 0]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh geometry={nodes.Cube011.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube012.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube013.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube014.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Cube015.geometry} material={materials.Silver} />
      </group>
    </group>
  );
}

useGLTF.preload("./bomb.glb");
