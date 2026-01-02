import { useCallback, useMemo, useRef, useState } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import type { BaseModuleProps } from "./module";
import Module from "./module";
import type { MeshStandardMaterial } from "three";
import { Text } from "@react-three/drei";
import { type ThreeEvent } from "@react-three/fiber";
import {
  CardinalDirection,
  type Point2D,
} from "../../generated/proto/common.pb";
import { GameService } from "../../services/api";
import { useGameStore } from "../../hooks/use-game-store";
import { CustomMaterials } from "./custom-materials";
import type { MazeState } from "../../generated/proto/maze_module.pb";

const TEXT_OFFSET = 0.001;
const FONT_SIZE = 0.03;
const FONT_FAMILY = "Digital7_Mono.ttf";
const FONT_COLOR = 0x2f530d;

export default function MazeModule({
  moduleId,
  name = "maze",
  position,
  state,
}: BaseModuleProps & {
  state?: MazeState;
}) {
  const { selectedBombId, selectedModuleId, sessionId } = useGameStore();
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const [playerPosition, setPlayerPosition] = useState(state?.playerPosition);
  const [isSolved, setIsSolved] = useState(false);

  const marker1Position = useMemo(() => {
    try {
      const x = parseInt(state?.maze?.marker1?.X);
      const y = parseInt(state?.maze?.marker1?.Y);
      return [x, y];
    } catch (e) {
      console.error("failed to place marker");
    }

    return undefined;
  }, [state?.maze?.marker1]);

  const marker2Position = useMemo(() => {
    try {
      const x = parseInt(state?.maze?.marker2?.X!);
      const y = parseInt(state?.maze?.marker2?.Y!);
      return [x, y];
    } catch (e) {
      console.error("failed to place marker");
    }

    return undefined;
  }, [state?.maze?.marker2]);

  const northRef = useRef<any>(null);
  const southRef = useRef<any>(null);
  const eastRef = useRef<any>(null);
  const westRef = useRef<any>(null);

  const onButtonClick = useCallback(
    async (e: ThreeEvent<MouseEvent>) => {
      if (isSolved) return;
      if (selectedModuleId !== moduleId) return;
      if (!e.object) return;

      e.stopPropagation();

      let value = { direction: undefined } as any;
      const object = e.object;

      switch (object) {
        case northRef.current:
          value.direction = CardinalDirection.NORTH;
          break;
        case southRef.current:
          value.direction = CardinalDirection.SOUTH;
          break;
        case eastRef.current:
          value.direction = CardinalDirection.EAST;
          break;
        case westRef.current:
          value.direction = CardinalDirection.WEST;
          break;
        default:
          console.log("Unknown object clicked");
      }

      if (value.direction !== undefined) {
        const res = await GameService.SendInput({
          sessionId,
          bombId: selectedBombId,
          moduleId: selectedModuleId,
          mazeInput: {
            direction: value.direction,
          },
        });

        const newPlayerPosition =
          res.mazeInputResult?.mazeState?.playerPosition;
        if (newPlayerPosition) {
          setPlayerPosition(newPlayerPosition);
        }
      }
    },
    [sessionId, selectedBombId, selectedModuleId],
  );

  // const emittingBacklight = useMemo(() => {
  //   const backlight: MeshStandardMaterial = materials.GreenBacklight;
  //   backlight.emissiveIntensity = 0.3;
  //   backlight.emissive.setHex(backlight?.color.getHex());
  //   return backlight;
  // }, [materials]);
  //
  // const emittingBacklightDark = useMemo(() => {
  //   const backlightDark: MeshStandardMaterial =
  //     materials["GreenBacklight.Dark"];
  //   backlightDark.emissiveIntensity = 0.25;
  //   backlightDark.emissive.setHex(backlightDark?.color.getHex());
  //   return backlightDark;
  // }, [materials]);

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeBackplate.geometry}
        material={materials.MazeBacklight}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0000Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
        position={[-0.051, 0.033, 0.035]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0001Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0002Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0003Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0004Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0005Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0100Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0101Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0102Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0103Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0104Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0105Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0200Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0201Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0202Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0203Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0204Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0205Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0300Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0301Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0302Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0303Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0304Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0305Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0400Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0401Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0402Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0403Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0404Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0405Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0500Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0501Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0502Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0503Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0504Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0505Dot"].geometry}
        material={materials["MazeLight.Unlit"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeButtonsE.geometry}
        material={materials["Plastic Dark"]}
        ref={eastRef}
        onClick={onButtonClick}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeButtonsW.geometry}
        material={materials["Plastic Dark"]}
        ref={westRef}
        onClick={onButtonClick}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeButtonsN.geometry}
        material={materials["Plastic Dark"]}
        ref={northRef}
        onClick={onButtonClick}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeButtonsS.geometry}
        material={materials["Plastic Dark"]}
        ref={southRef}
        onClick={onButtonClick}
      />
      {marker1Position && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MazeMarkerA.geometry}
          material={materials["Maze.MarkerA"]}
          position={[
            -0.051 + 0.0165 * marker1Position[0],
            0.033 - 0.0165 * marker1Position[1],
            0.035,
          ]}
        />
      )}
      {marker2Position && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MazeMarkerB.geometry}
          material={materials["Maze.MarkerB"]}
          position={[
            -0.051 + 0.0165 * marker2Position[0],
            0.033 - 0.0165 * marker2Position[1],
            0.035,
          ]}
        />
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeShell.geometry}
        material={materials["Plastic Dark"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Light010.geometry}
        material={materials["Unlit light"]}
        position={[0.062, 0.064, 0.021]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </Module>
  );
}
