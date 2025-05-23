import { Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type BaseModuleProps } from "./module";

export default function SimonSaysModule({
  moduleId,
  name = "simon-says",
  position,
}: BaseModuleProps) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const { zoomState } = useGameStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const [mixer, setMixer] = useState<THREE.AnimationMixer | undefined>();

  const onSimonSaysClick = useCallback(
    (selected: THREE.Object3D[]) => {
      if (zoomState !== "module-view") return;
      if (!selected.length) return;
      if (isAnimating) return;

      const selectedMesh: any = selected[0];
      const selectedMaterial = selectedMesh.material;

      const clonedMaterial = selectedMaterial.clone();
      selectedMesh.material = clonedMaterial;

      const originalColor: THREE.Color = clonedMaterial.color;
      const { r, g, b } = originalColor;
      const multiplier = 1.1;
      const r2 = r * multiplier;
      const g2 = g * multiplier;
      const b2 = b * multiplier;

      const colorKF = new THREE.ColorKeyframeTrack(
        ".color",
        [0, 0.2, 0.3],
        [r, g, b, r2, g2, b2, r, g, b]
      );
      const emissiveKF = new THREE.ColorKeyframeTrack(
        ".emissive",
        [0, 0.2, 0.3],
        [0, 0, 0, r2, g2, b2, 0, 0, 0]
      );
      const intensityKF = new THREE.NumberKeyframeTrack(
        ".emissiveIntensity",
        [0, 0.2, 0.3],
        [0, 1.5, 0]
      );

      const clip = new THREE.AnimationClip("flash", -1, [
        colorKF,
        emissiveKF,
        intensityKF,
      ]);

      if (mixer) {
        mixer.stopAllAction();
      }

      const newMixer = new THREE.AnimationMixer(clonedMaterial);
      const action = newMixer.clipAction(clip);
      action.reset().play();
      setIsAnimating(true);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.timeScale = 1;
      setMixer(newMixer);

      newMixer.addEventListener("finished", () => {
        selectedMesh.material = selectedMaterial;
        newMixer.stopAllAction();
        setIsAnimating(false);
      });
    },
    [zoomState, mixer, isAnimating]
  );

  useFrame((_state, delta) => mixer?.update(delta));

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SimonSaysModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <Select onChangePointerUp={onSimonSaysClick}>
          <group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SimonSaysPatternD.geometry}
              material={materials.GreenLight}
              position={[0, -0.035, 0.032]}
              scale={1.062}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SimonSaysPatternL.geometry}
              material={materials.RedLight}
              position={[-0.034, 0, 0.032]}
              scale={1.062}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SimonSaysPatternR.geometry}
              material={materials.YellowLight}
              position={[0.034, 0, 0.032]}
              scale={1.062}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SimonSaysPatternU.geometry}
              material={materials.BlueLight}
              position={[0, 0.035, 0.032]}
              scale={1.062}
            />
          </group>
        </Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light003.geometry}
          material={materials["Unlit light"]}
          position={[0.062, 0.064, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </mesh>
    </Module>
  );
}
