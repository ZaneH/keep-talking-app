import { useCursor } from "@react-three/drei";
import { useState } from "react";
import { useGameStore } from "../hooks/use-game-store";
import { useModuleModel } from "../hooks/use-module-model";

export default function Table() {
  const { nodes, materials } = useModuleModel("table");
  const { zoomState } = useGameStore();

  const [isHovered, setIsHovered] = useState(false);

  useCursor(isHovered);

  return (
    <group
      onPointerEnter={(e) => {
        if (zoomState === "module-view") {
          setIsHovered(true);
          e.stopPropagation();
        }
      }}
      onPointerLeave={(e) => {
        if (zoomState === "module-view") {
          setIsHovered(false);
          e.stopPropagation();
        }
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor001.geometry}
        material={materials.Floor}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roof001.geometry}
        material={materials["Wall Brick"]}
        position={[0, 2.73, 0]}
        rotation={[0, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WallB001.geometry}
        material={materials["Wall Brick"]}
        position={[0, 1.674, -1.674]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WallF001.geometry}
        material={materials["Wall Brick"]}
        position={[0, 1.674, 1.674]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WallR001.geometry}
        material={materials["Wall Brick"]}
        position={[1.674, 1.674, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WallL001.geometry}
        material={materials["Wall Brick"]}
        position={[-1.674, 1.674, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Legs001.geometry}
        material={materials["Metal.Table"]}
        position={[0.655, 0, -0.335]}
        scale={0.184}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top001.geometry}
        material={materials["Metal.Table"]}
        position={[0, 0.449, 0]}
      />
    </group>
  );
}
