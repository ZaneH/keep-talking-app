import { useCursor, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useControls } from "./controls-provider";
import { useGameStore } from "../hooks/use-game-store";
// import { materials } from "./materials";

export default function Table() {
  const { nodes, materials } = useGLTF("/table-room.glb") as any;
  const controls = useControls();
  const { zoomState, reset } = useGameStore();

  const [isHovered, setIsHovered] = useState(false);

  useCursor(isHovered);

  return (
    <group
      onClick={(e) => {
        if (zoomState !== "module-view") {
          return;
        }

        e.stopPropagation();
        reset();
        setIsHovered(false);
        const camControls = controls.current;
        if (!camControls) return;

        camControls.setPosition(0, 0, 1.5);
        camControls.setTarget(0, 0, 0);
      }}
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
      <group position={[0, 0.916, -1.674]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bars.geometry}
          material={materials["Darker Orange"]}
          scale={[0.106, 1.058, 0.106]}
        />
        <mesh
          // castShadow
          receiveShadow
          geometry={nodes.Frame.geometry}
          material={materials["Darker Orange"]}
          position={[0, 0.758, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[5.492, 12, 5.492]}
        />
        <mesh
          // castShadow
          receiveShadow
          geometry={nodes.Glass.geometry}
          material={materials.Window}
          position={[0, -0.002, 0]}
          scale={[1.011, 1.011, 0.01]}
        />
      </group>
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={materials["Orange PBSR"]}
        scale={[5.492, 12, 5.492]}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Roof.geometry}
        material={materials["Orange PBSR"]}
        position={[0, 2.73, 0]}
        rotation={[0, 0, Math.PI]}
        scale={[5.492, 12, 5.492]}
      />
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.WallAccent.geometry}
        material={materials["Darker Orange"]}
        position={[1.674, 0.369, 0]}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.WallB.geometry}
        material={materials["Orange PBSR"]}
        position={[0, 1.674, -1.674]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[5.492, 12, 5.492]}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.WallF.geometry}
        material={materials["Orange PBSR"]}
        position={[0, 1.674, 1.674]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[5.492, 12, 5.492]}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.WallL.geometry}
        material={materials["Orange PBSR"]}
        position={[-1.674, 1.674, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[5.492, 12, 5.492]}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.WallR.geometry}
        material={materials["Orange PBSR"]}
        position={[1.674, 1.674, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[5.492, 12, 5.492]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Legs.geometry}
        material={materials["Orange PBSR"]}
        position={[0.655, 0, -0.335]}
        scale={0.184}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top.geometry}
        material={materials["Orange PBSR"]}
        position={[0, 0.449, 0]}
        scale={0.184}
      />
    </group>
  );
}

useGLTF.preload("/table-room.glb");
