import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useGameStore } from "../../store/use-game-store";
import { useHighlight } from "../highlight-provider";
import Module from "./module";

export default function BigButtonModule({ id = "bigbutton" }) {
  const { nodes, materials } = useGLTF("/big-button-module.glb") as any;
  const { highlight, unhighlight } = useHighlight();
  const outlineRef = useRef(null);
  const { zoomState, selectedModuleUUID } = useGameStore();

  useEffect(() => {
    if (zoomState !== "idle") {
      unhighlight(outlineRef);
    }
  }, [zoomState]);

  return (
    <Module id={id} position={[0.195, 0.629, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonModule.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={outlineRef}
        onPointerEnter={() => {
          if (selectedModuleUUID !== id) {
            highlight(outlineRef);
          }
        }}
        onPointerLeave={() => {
          unhighlight(outlineRef);
        }}
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
          geometry={nodes.Light003.geometry}
          material={materials["Unlit light"]}
          position={[0.054, 0.057, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.011, 0.012, 0.011]}
        />
      </mesh>
    </Module>
  );
}
