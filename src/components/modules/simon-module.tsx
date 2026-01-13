import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { Color } from "../../generated/proto/common.pb";
import type { SimonState } from "../../generated/proto/simon_module.pb";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { useGuardedInput } from "../../hooks/use-module-input";
import { GameService } from "../../services/api";
import { CustomMaterials } from "./custom-materials";
import Module, { type BaseModuleProps } from "./module";

const globalSimonClock = new THREE.Clock();
globalSimonClock.start();

const FLASH_DURATION = 0.3; // seconds
const SEQUENCE_DELAY = 0.75; // seconds between flashes
const SEQUENCE_PAUSE = 2.0; // seconds between sequences

export default function SimonSaysModule({
  moduleId,
  name = "simon-says",
  state,
  position,
}: BaseModuleProps & {
  state?: SimonState;
}) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const {
    selectedModuleId,
    sessionId,
    selectedBombId,
    updateBombFromStatus,
  } = useGameStore();
  const { onPointerDown, guard } = useGuardedInput(moduleId);
  const mixer = useRef<THREE.AnimationMixer | undefined>(undefined);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  const isAnimating = useRef<boolean>(false);

  const [currentSequence, setCurrentSequence] = useState(
    state?.currentSequence || [],
  );

  const sequencePosition = useRef<number>(0);
  const [showingSequence, setShowingSequence] = useState(true);

  const lastFlashedIndex = useRef<number>(-1);

  const redButtonRef = useRef<THREE.Mesh>(null);
  const greenButtonRef = useRef<THREE.Mesh>(null);
  const yellowButtonRef = useRef<THREE.Mesh>(null);
  const blueButtonRef = useRef<THREE.Mesh>(null);

  const createFlashingAnimation = useCallback(
    (targetMesh: THREE.Mesh, selectedMaterial: THREE.Material) => {
      if (isAnimating.current) return null;

      const clonedMaterial = (selectedMaterial as any).clone();
      targetMesh.material = clonedMaterial;

      const originalColor: THREE.Color = clonedMaterial.color;
      const { r, g, b } = originalColor;
      const multiplier = 1.1;
      const r2 = r * multiplier;
      const g2 = g * multiplier;
      const b2 = b * multiplier;

      const colorKF = new THREE.ColorKeyframeTrack(
        ".color",
        [0, 0.2, 0.3],
        [r, g, b, r2, g2, b2, r, g, b],
      );
      const emissiveKF = new THREE.ColorKeyframeTrack(
        ".emissive",
        [0, 0.2, 0.3],
        [0, 0, 0, r2, g2, b2, 0, 0, 0],
      );
      const intensityKF = new THREE.NumberKeyframeTrack(
        ".emissiveIntensity",
        [0, 0.2, 0.3],
        [0, 1.5, 0],
      );

      const clip = new THREE.AnimationClip("flash", -1, [
        colorKF,
        emissiveKF,
        intensityKF,
      ]);

      if (mixer.current) {
        mixer.current.stopAllAction();
      }

      const newMixer = new THREE.AnimationMixer(clonedMaterial);
      const action = newMixer.clipAction(clip);
      action.reset().play();
      isAnimating.current = true;
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.timeScale = 1;
      mixer.current = newMixer;

      newMixer.addEventListener("finished", () => {
        targetMesh.material = selectedMaterial;
        newMixer.stopAllAction();
        isAnimating.current = false;
      });

      return newMixer;
    },
    [mixer],
  );

  const onButtonClick = useCallback(
    async (event: ThreeEvent<PointerEvent>) => {
      const guarded = guard(() => {
        if (isSolved) return undefined;
        if (selectedModuleId !== moduleId) return undefined;
        if (!event.object) return undefined;
        if (isAnimating.current) return undefined;
        return event.object;
      });
      if (guarded === undefined) return;
      const selectedMesh: any = guarded;

      setShowingSequence(false);

      const selectedMaterial = selectedMesh.material;

      createFlashingAnimation(selectedMesh, selectedMaterial);

      let clickedColor: Color | undefined;
      if (selectedMesh === redButtonRef.current) clickedColor = Color.RED;
      else if (selectedMesh === greenButtonRef.current)
        clickedColor = Color.GREEN;
      else if (selectedMesh === yellowButtonRef.current)
        clickedColor = Color.YELLOW;
      else if (selectedMesh === blueButtonRef.current)
        clickedColor = Color.BLUE;

      const response = await GameService.SendInput({
        sessionId,
        bombId: selectedBombId,
        moduleId,
        simonInput: {
          color: clickedColor,
        },
      });

      const { displaySequence, hasFinishedSeq } =
        response.simonInputResult || {};

      if (response.solved) {
        setIsSolved(true);
        setShowingSequence(false);
        return;
      }

      if (response.strike) {
        setShowingSequence(true);
        sequencePosition.current = 0;
      }

      if (response.bombStatus?.strikeCount !== undefined && selectedBombId) {
        updateBombFromStatus(selectedBombId, response.bombStatus.strikeCount);
      }

      if (displaySequence) {
        setCurrentSequence(displaySequence);
        if (hasFinishedSeq) {
          sequencePosition.current = 0;
          setShowingSequence(true);
        }
      }
    },
    [
      mixer,
      isAnimating,
      selectedModuleId,
      showingSequence,
      selectedBombId,
      moduleId,
      guard,
      isSolved,
      updateBombFromStatus,
    ],
  );

  const flashButtonByColor = useCallback(
    (color: Color) => {
      let targetMesh: THREE.Mesh | null = null;
      if (color === Color.BLUE) targetMesh = blueButtonRef.current;
      else if (color === Color.GREEN) targetMesh = greenButtonRef.current;
      else if (color === Color.RED) targetMesh = redButtonRef.current;
      else if (color === Color.YELLOW) targetMesh = yellowButtonRef.current;

      if (!targetMesh || isAnimating.current) return;

      const selectedMaterial = targetMesh.material as any;
      createFlashingAnimation(targetMesh, selectedMaterial);
    },
    [createFlashingAnimation],
  );

  useFrame((_, delta) => {
    mixer.current?.update(delta);

    if (!showingSequence || currentSequence.length === 0) return;

    const elapsedTime = globalSimonClock.getElapsedTime();

    const fullCycleTime =
      currentSequence.length * SEQUENCE_DELAY + SEQUENCE_PAUSE;
    const normalizedTime = elapsedTime % fullCycleTime;

    if (normalizedTime < currentSequence.length * SEQUENCE_DELAY) {
      const currentIndex = Math.floor(normalizedTime / SEQUENCE_DELAY);
      const timeInStep = normalizedTime % SEQUENCE_DELAY;

      if (timeInStep < FLASH_DURATION && !isAnimating.current) {
        if (currentIndex !== lastFlashedIndex.current) {
          const colorToFlash = currentSequence[currentIndex];
          flashButtonByColor(colorToFlash);

          lastFlashedIndex.current = currentIndex;
        }
      } else if (timeInStep >= FLASH_DURATION) {
        if (currentIndex === lastFlashedIndex.current) {
          lastFlashedIndex.current = -1;
        }
      }
    }
  });

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
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SimonSaysPatternD.geometry}
            material={materials.GreenLight}
            position={[0, -0.034, 0.03]}
            onPointerDown={onPointerDown}
            onPointerUp={onButtonClick}
            ref={greenButtonRef}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SimonSaysPatternL.geometry}
            material={materials.RedLight}
            position={[-0.034, 0, 0.03]}
            onPointerDown={onPointerDown}
            onPointerUp={onButtonClick}
            ref={redButtonRef}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SimonSaysPatternR.geometry}
            material={materials.YellowLight}
            position={[0.034, 0, 0.03]}
            onPointerDown={onPointerDown}
            onPointerUp={onButtonClick}
            ref={yellowButtonRef}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SimonSaysPatternU.geometry}
            material={materials.BlueLight}
            position={[0, 0.034, 0.03]}
            onPointerDown={onPointerDown}
            onPointerUp={onButtonClick}
            ref={blueButtonRef}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light003.geometry}
          material={
            isSolved ? CustomMaterials.GreenLight : materials["Unlit light"]
          }
          position={[0.062, 0.064, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </mesh>
    </Module>
  );
}
