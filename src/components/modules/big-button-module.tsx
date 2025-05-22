import { useEffect, useRef, useState } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type ModuleProps } from "./module";
import { useGameStore } from "../../hooks/use-game-store";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { pbColorToHex } from "../../utils/pbcolor-to-hex";
import type { BigButtonState } from "../../generated/proto/big_button_module.pb";
import { Color } from "../../generated/proto/common.pb";

export default function BigButtonModule({
  moduleId,
  name = "big-button",
  state,
}: ModuleProps & {
  state?: BigButtonState;
}) {
  const coverRef = useRef<THREE.Mesh>(null);
  const { nodes, materials, animations } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { actions, mixer } = useAnimations(animations, coverRef);
  const { pointerHandlers } = useModuleHighlight({ id: name, meshRef });
  // const [stripColor, setStripeColor] = useState<string>();
  const { selectedModuleId } = useGameStore();
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [prevAction, setPrevAction] = useState<any>(null);

  useEffect(() => {
    if (prevAction) {
      prevAction.fadeOut(0);
    }

    // Flip up cover
    if (moduleId === selectedModuleId) {
      const action = actions?.OpenAction;
      if (action) {
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.timeScale = 1;
        action.reset().play();
        setIsCoverOpen(true);
      }
    } else {
      const action = actions?.CloseAction;
      if (action && isCoverOpen) {
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.timeScale = 1;
        action.reset().play();
        setIsCoverOpen(false);
      }
    }

    mixer.addEventListener("finished", (e: any) => {
      if (e.action === actions?.OpenAction) {
        setPrevAction(actions?.OpenAction);
      } else if (e.action === actions?.CloseAction) {
        setPrevAction(actions?.CloseAction);
      }
    });
  }, [selectedModuleId]);

  const buttonColor: THREE.MeshStandardMaterial =
    materials["Button Red"].clone();
  buttonColor.color = new THREE.Color(
    pbColorToHex(state?.buttonColor || Color.UNKNOWN)
  );

  return (
    <Module id={moduleId} name={name} position={[0.195, 0.629, 0.1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonModule.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <group position={[0.002, 0.096, -0.074]} scale={[0.943, 0.943, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ButtonHead.geometry}
            material={buttonColor}
            position={[0, -0.108, 0.127]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.043, 0.006, 0.043]}
            onPointerDown={() => {
              console.log("Pointer down");
            }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ButtonShaft.geometry}
            material={buttonColor}
            position={[0, -0.108, 0.113]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.032, 0.011, 0.032]}
          />
        </group>
        <mesh
          name="Cover"
          ref={coverRef}
          castShadow
          receiveShadow
          geometry={nodes.Cover.geometry}
          material={materials.ClearPlastic}
          position={[0, 0.077, 0.033]}
          scale={[0.077, 0.077, 0.079]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hinge.geometry}
          material={materials["Silver Dark"]}
          position={[0, 0.077, 0.033]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.004, 0.017, 0.004]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightRing.geometry}
          material={materials["Unlit light"]}
          position={[0.002, -0.007, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.425, 1.466, 1.425]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light005.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}
