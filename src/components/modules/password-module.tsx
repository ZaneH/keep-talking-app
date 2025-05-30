import { useMemo, useRef } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import type { BaseModuleProps } from "./module";
import Module from "./module";
import type { MeshStandardMaterial } from "three";
import { Text } from "@react-three/drei";

const TEXT_OFFSET = 0.001;
const FONT_SIZE = 0.03;
const FONT_FAMILY = "Digital7_Mono.ttf";
const FONT_COLOR = 0x2f530d;

export default function PasswordModule({
  moduleId,
  name = "password",
  position,
}: BaseModuleProps) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });

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
            K
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
            T
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
            A
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
            N
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
            E
          </Text>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button1.geometry}
          material={materials.ArrowImage}
          position={[-0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button2.geometry}
          material={materials.ArrowImage}
          position={[-0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button3.geometry}
          material={materials.ArrowImage}
          position={[0, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button4.geometry}
          material={materials.ArrowImage}
          position={[0.026, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button5.geometry}
          material={materials.ArrowImage}
          position={[0.051, -0.034, 0.031]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
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
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light001.geometry}
          material={materials["Unlit light"]}
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}
