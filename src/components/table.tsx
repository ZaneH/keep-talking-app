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
        geometry={nodes.Bars.geometry}
        material={materials["Darker Orange"]}
        position={[0, 0.916, -1.674]}
        scale={[0.106, 1.058, 0.106]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Glass.geometry}
        material={materials.Window}
        position={[0, 0.914, -1.674]}
        scale={[1.011, 1.011, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={materials["Orange PBSR"]}
      />
    </group>
  );
}
