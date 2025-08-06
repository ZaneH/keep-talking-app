import { useCallback, useMemo, useRef, useState } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import type { BaseModuleProps } from "./module";
import Module from "./module";
import { Text } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { IncrementDecrement } from "../../generated/proto/common.pb";
import { GameService } from "../../services/api";
import { useGameStore } from "../../hooks/use-game-store";
import type { MorseState } from "../../generated/proto/morse_module.pb";
import { CustomMaterials } from "./custom-materials";
import * as THREE from "three";

const TEXT_OFFSET = 0.013;
const FONT_SIZE = 0.015;
const FONT_FAMILY = "/fonts/munro.ttf";
const FONT_COLOR = 0xce7422;
const SCREEN_TEXT_ATTRS = {
  font: FONT_FAMILY,
  fontSize: FONT_SIZE,
  color: FONT_COLOR,
};

const DOT_DURATION = 0.3;
const DASH_DURATION = 0.9;
const SYMBOL_PAUSE = 0.3;
const LETTER_PAUSE = 0.9;

const SLIDER_FACTOR = 0.0064;

export default function MorseModule({
  moduleId,
  name = "morse",
  position,
  state,
}: BaseModuleProps & {
  state?: MorseState;
}) {
  const { selectedBombId, selectedModuleId, sessionId } = useGameStore();
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const displayedPattern = state?.displayedPattern;
  const [displayedFrequency, setDisplayedFrequency] = useState(
    state?.displayedFrequency,
  );
  const [selectedFrequencyIdx, setSelectedFrequencyIndex] = useState(
    state?.selectedFrequencyIndex || 0,
  );

  const [isSolved, setIsSolved] = useState(false);

  const txButtonRef = useRef<any>(null);
  const freqDownRef = useRef<any>(null);
  const freqUpRef = useRef<any>(null);

  const tubeInnerRef = useRef<any>(null);
  const isLightOn = useRef(false);

  const localMorseClock = useMemo(() => {
    const clock = new THREE.Clock();
    clock.start();
    return clock;
  }, [moduleId]);

  const clonedAmberMaterial = useMemo(() => {
    return materials["Light.Amber.001"].clone();
  }, [materials, moduleId]);

  const freqSliderPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i <= 15; i++) {
      positions.push([-0.048 + i * SLIDER_FACTOR, 0.013, 0.002]);
    }
    return positions;
  }, []);

  const freqSliderPos = freqSliderPositions[selectedFrequencyIdx];

  const patternTimings = useMemo(() => {
    if (!displayedPattern) return [];

    const timings: { duration: number; isOn: boolean }[] = [];

    for (let i = 0; i < displayedPattern.length; i++) {
      const char = displayedPattern[i];

      if (char === ".") {
        timings.push({ duration: DOT_DURATION, isOn: true });
        timings.push({ duration: SYMBOL_PAUSE, isOn: false });
      } else if (char === "-") {
        timings.push({ duration: DASH_DURATION, isOn: true });
        timings.push({ duration: SYMBOL_PAUSE, isOn: false });
      } else if (char === " ") {
        // Space already has the symbol pause before it, so add the difference
        timings.push({ duration: LETTER_PAUSE - SYMBOL_PAUSE, isOn: false });
      }
    }

    return timings;
  }, [displayedPattern, moduleId]);

  const setLightState = useCallback((isOn: boolean) => {
    if (!tubeInnerRef.current) return;

    const material = tubeInnerRef.current.material;

    if (isOn) {
      material.emissive = new THREE.Color(0xffcc00);
      material.emissiveIntensity = 3;
    } else {
      material.emissive = new THREE.Color(0x000000);
      material.emissiveIntensity = 0.2;
    }

    isLightOn.current = isOn;
  }, []);

  useFrame(() => {
    if (
      !displayedPattern ||
      patternTimings.length === 0 ||
      !tubeInnerRef.current ||
      isSolved
    ) {
      return;
    }

    const elapsedTime = localMorseClock.getElapsedTime();

    // Calculate total cycle time
    const totalDuration = patternTimings.reduce(
      (sum, timing) => sum + timing.duration,
      0,
    );

    // Prevent division by zero
    if (totalDuration === 0) return;

    const normalizedTime = elapsedTime % totalDuration;

    // Only process during the sequence part of the cycle
    if (normalizedTime < totalDuration) {
      // Find the current position in the sequence
      let timeSum = 0;
      let currentIndex = 0;

      for (let i = 0; i < patternTimings.length; i++) {
        const prevTimeSum = timeSum;
        timeSum += patternTimings[i].duration;

        if (normalizedTime >= prevTimeSum && normalizedTime < timeSum) {
          currentIndex = i;
          break;
        }
      }

      // Apply the appropriate light state
      const shouldBeOn = patternTimings[currentIndex].isOn;
      if (isLightOn.current !== shouldBeOn) {
        setLightState(shouldBeOn);
      }
    } else if (isLightOn.current) {
      // Ensure light is off during the pause
      setLightState(false);
    }
  });

  const onButtonClick = useCallback(
    async (event: ThreeEvent<MouseEvent>) => {
      if (isSolved) return;
      if (selectedModuleId !== moduleId) return;
      if (!event.object) return;

      if (event.object === txButtonRef.current) {
        const res = await GameService.SendInput({
          sessionId,
          bombId: selectedBombId,
          moduleId,
          morseInput: {
            tx: {},
          },
        });

        if (res.solved) {
          setIsSolved(true);
        }
      } else if (
        event.object === freqDownRef.current ||
        event.object === freqUpRef.current
      ) {
        let direction: IncrementDecrement;
        if (event.object === freqDownRef.current) {
          direction = IncrementDecrement.DECREMENT;
        } else {
          direction = IncrementDecrement.INCREMENT;
        }

        const res = await GameService.SendInput({
          sessionId,
          bombId: selectedBombId,
          moduleId,
          morseInput: {
            frequencyChange: {
              direction: direction,
            },
          },
        });

        const newFreq = res.morseInputResult?.morseState?.displayedFrequency;
        setDisplayedFrequency(newFreq);
        const newIdx = res.morseInputResult?.morseState?.selectedFrequencyIndex;
        setSelectedFrequencyIndex(newIdx || 0);
      }
    },
    [isSolved, selectedModuleId, moduleId, sessionId, selectedBombId],
  );

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MorseModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <group position={[-0.034, 0.063, 0.034]} scale={[1.167, 1.167, 1.2]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorsePlugs.geometry}
            material={materials["Plastic Light"]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.012, 0.002, 0.012]}
          />
          <group rotation={[0, 0, -Math.PI / 2]} scale={[0.012, 0.002, 0.012]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cylinder025.geometry}
              material={materials["Plastic Dark"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cylinder025_1.geometry}
              material={materials["Plastic Light"]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorsePlugsCapR.geometry}
            material={materials["Plastic Dark"]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.012, 0.002, 0.012]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorseTube.geometry}
            material={materials["Light.Amber"]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.009, 0.013, 0.009]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorseTubeInner.geometry}
            material={clonedAmberMaterial}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.005, 0.013, 0.005]}
            ref={tubeInnerRef}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ButtonTx.geometry}
          material={materials["Button.Tx"]}
          position={[0, -0.054, 0.028]}
          scale={[0.972, 0.972, 1]}
          ref={txButtonRef}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MorseFrame.geometry}
          material={materials["Metal.Dark"]}
          position={[0, 0, 0.031]}
          scale={[0.972, 0.972, 1]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.FrequencySlider.geometry}
            material={materials["Plastic.Red"]}
            position={freqSliderPos as [number, number, number]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorseButtonL.geometry}
            material={materials["Plastic Dark"]}
            position={[-0.06, -0.01, 0.003]}
            rotation={[Math.PI / 2, 0, 0]}
            ref={freqDownRef}
            onClick={onButtonClick}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorseButtonR.geometry}
            material={materials["Plastic Dark"]}
            position={[0.06, -0.01, 0.003]}
            rotation={[Math.PI / 2, 0, 0]}
            ref={freqUpRef}
            onClick={onButtonClick}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorseScreen.geometry}
            material={materials["Screen.Blue"]}
            position={[0, -0.011, -0.0087]}
          >
            <Text {...SCREEN_TEXT_ATTRS} position={[0, 0, TEXT_OFFSET]}>
              {displayedFrequency !== undefined
                ? `${displayedFrequency.toFixed(3)} Hz`
                : "0 Hz"}
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MorseScreen001.geometry}
            material={materials["Screen.Morse"]}
            position={[0, 0.013, -0.0087]}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MorseWireLeft.geometry}
          material={materials["Morse.Wire"]}
          position={[-0.073, 0.063, 0.034]}
          scale={[0.972, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MorseWireRight.geometry}
          material={materials["Morse.Wire"]}
          position={[0.061, 0.062, 0.034]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light009.geometry}
          material={
            isSolved ? CustomMaterials.GreenLight : materials["Unlit light"]
          }
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}
