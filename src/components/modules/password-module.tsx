import { useCallback, useMemo, useRef, useState } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import type { BaseModuleProps } from "./module";
import Module from "./module";
import type { MeshStandardMaterial } from "three";
import { Text } from "@react-three/drei";
import { type ThreeEvent } from "@react-three/fiber";
import { IncrementDecrement } from "../../generated/proto/common.pb";
import { GameService } from "../../services/api";
import { useGameStore } from "../../hooks/use-game-store";
import type { PasswordState } from "../../generated/proto/password_module.pb";
import { CustomMaterials } from "./custom-materials";

const TEXT_OFFSET = 0.001;
const FONT_SIZE = 0.03;
const FONT_FAMILY = "Digital7_Mono.ttf";
const FONT_COLOR = 0x2f530d;

export default function PasswordModule({
  moduleId,
  name = "password",
  position,
  state,
}: BaseModuleProps & {
  state?: PasswordState;
}) {
  const { selectedBombId, selectedModuleId, sessionId } = useGameStore();
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const [letters, setLetters] = useState<string | undefined>(state?.letters);
  const [isSolved, setIsSolved] = useState(false);

  const lu1Ref = useRef<any>(null);
  const ld1Ref = useRef<any>(null);
  const lu2Ref = useRef<any>(null);
  const ld2Ref = useRef<any>(null);
  const lu3Ref = useRef<any>(null);
  const ld3Ref = useRef<any>(null);
  const lu4Ref = useRef<any>(null);
  const ld4Ref = useRef<any>(null);
  const lu5Ref = useRef<any>(null);
  const ld5Ref = useRef<any>(null);
  const submitButtonRef = useRef<any>(null);

  const onButtonClick = useCallback(
    async (e: ThreeEvent<MouseEvent>) => {
      if (isSolved) return;
      if (selectedModuleId !== moduleId) return;
      if (!e.object) return;

      e.stopPropagation();

      let value = { direction: undefined, index: -1 } as any;
      const object = e.object;

      switch (object) {
        case lu1Ref.current:
          value.direction = IncrementDecrement.INCREMENT;
          value.index = 0;
          break;
        case lu2Ref.current:
          value.direction = IncrementDecrement.INCREMENT;
          value.index = 1;
          break;
        case lu3Ref.current:
          value.direction = IncrementDecrement.INCREMENT;
          value.index = 2;
          break;
        case lu4Ref.current:
          value.direction = IncrementDecrement.INCREMENT;
          value.index = 3;
          break;
        case lu5Ref.current:
          value.direction = IncrementDecrement.INCREMENT;
          value.index = 4;
          break;

        case ld1Ref.current:
          value.direction = IncrementDecrement.DECREMENT;
          value.index = 0;
          break;
        case ld2Ref.current:
          value.direction = IncrementDecrement.DECREMENT;
          value.index = 1;
          break;
        case ld3Ref.current:
          value.direction = IncrementDecrement.DECREMENT;
          value.index = 2;
          break;
        case ld4Ref.current:
          value.direction = IncrementDecrement.DECREMENT;
          value.index = 3;
          break;
        case ld5Ref.current:
          value.direction = IncrementDecrement.DECREMENT;
          value.index = 4;
          break;

        case submitButtonRef.current:
          const res = await GameService.SendInput({
            sessionId,
            bombId: selectedBombId,
            moduleId: selectedModuleId,
            passwordInput: {
              submit: {},
            },
          });

          if (res.solved) {
            setIsSolved(true);
          }
          break;

        default:
          console.log("Unknown object clicked");
      }

      if (value.direction !== undefined && value.index !== -1) {
        const res = await GameService.SendInput({
          sessionId,
          bombId: selectedBombId,
          moduleId: selectedModuleId,
          passwordInput: {
            letterChange: {
              direction: value.direction,
              letterIndex: value.index,
            },
          },
        });

        const newLetters = res.passwordInputResult?.passwordState?.letters;
        if (newLetters) {
          setLetters(newLetters);
        }
      }
    },
    [sessionId, selectedBombId, selectedModuleId],
  );

  const emittingBacklight = useMemo(() => {
    const backlight: MeshStandardMaterial = materials.GreenBacklight;
    backlight.emissiveIntensity = 0.3;
    backlight.emissive.setHex(backlight?.color.getHex());
    return backlight;
  }, [materials]);

  const emittingBacklightDark = useMemo(() => {
    const backlightDark: MeshStandardMaterial =
      materials["GreenBacklight.Dark"];
    backlightDark.emissiveIntensity = 0.25;
    backlightDark.emissive.setHex(backlightDark?.color.getHex());
    return backlightDark;
  }, [materials]);

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PasswordModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Backlight.geometry}
          material={emittingBacklight}
          position={[0, 0, 0.004]}
          scale={[1.004, 0.918, 0.944]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane1.geometry}
            material={emittingBacklightDark}
            position={[-0.051, 0, 0.032]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Text
            fontSize={FONT_SIZE}
            position={[-0.051, 0, 0.032 + TEXT_OFFSET]}
            font={`/fonts/${FONT_FAMILY}`}
            color={FONT_COLOR}
          >
            {letters?.[0]}
          </Text>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane2.geometry}
            material={emittingBacklightDark}
            position={[-0.026, 0, 0.032]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Text
            fontSize={FONT_SIZE}
            position={[-0.026, 0, 0.032 + TEXT_OFFSET]}
            font={`/fonts/${FONT_FAMILY}`}
            color={FONT_COLOR}
          >
            {letters?.[1]}
          </Text>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane3.geometry}
            material={emittingBacklightDark}
            position={[0, 0, 0.032]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Text
            fontSize={FONT_SIZE}
            position={[0, 0, 0.032 + TEXT_OFFSET]}
            font={`/fonts/${FONT_FAMILY}`}
            color={FONT_COLOR}
          >
            {letters?.[2]}
          </Text>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane4.geometry}
            material={emittingBacklightDark}
            position={[0.026, 0, 0.032]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Text
            fontSize={FONT_SIZE}
            position={[0.026, 0, 0.032 + TEXT_OFFSET]}
            font={`/fonts/${FONT_FAMILY}`}
            color={FONT_COLOR}
          >
            {letters?.[3]}
          </Text>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane5.geometry}
            material={emittingBacklightDark}
            position={[0.051, 0, 0.032]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Text
            fontSize={FONT_SIZE}
            position={[0.051, 0, 0.032 + TEXT_OFFSET]}
            font={`/fonts/${FONT_FAMILY}`}
            color={FONT_COLOR}
          >
            {letters?.[4]}
          </Text>
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button1B.geometry}
          material={materials.ArrowImage}
          position={[-0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={ld1Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button1T.geometry}
          material={materials.ArrowImage}
          position={[-0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={lu1Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button2B.geometry}
          material={materials.ArrowImage}
          position={[-0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={ld2Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button2T.geometry}
          material={materials.ArrowImage}
          position={[-0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={lu2Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button3B.geometry}
          material={materials.ArrowImage}
          position={[0, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={ld3Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button3T.geometry}
          material={materials.ArrowImage}
          position={[0, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={lu3Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button4B.geometry}
          material={materials.ArrowImage}
          position={[0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={ld4Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button4T.geometry}
          material={materials.ArrowImage}
          position={[0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={lu4Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button5B.geometry}
          material={materials.ArrowImage}
          position={[0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={ld5Ref}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button5T.geometry}
          material={materials.ArrowImage}
          position={[0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
          ref={lu5Ref}
          onClick={onButtonClick}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LCDFrame001.geometry}
          material={materials["Plastic Dark"]}
          position={[0, 0, 0.012]}
          scale={[1.031, 0.972, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SubmitButton.geometry}
          material={materials.SubmitButton}
          position={[0, -0.061, 0.032]}
          scale={[1.118, 1.118, 1.15]}
          ref={submitButtonRef}
          onClick={onButtonClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light001.geometry}
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
