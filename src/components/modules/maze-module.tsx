import { useCallback, useMemo, useRef, useState } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import type { BaseModuleProps } from "./module";
import Module from "./module";
import type { MeshStandardMaterial } from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { CardinalDirection } from "../../generated/proto/common.pb";
import { GameService } from "../../services/api";
import { useGameStore } from "../../hooks/use-game-store";
import type { MazeState } from "../../generated/proto/maze_module.pb";
import { CustomMaterials } from "./custom-materials";

const GRID_OFFSET = 0.0165;

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
  const goalRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const [playerPosition, setPlayerPosition] = useState(state?.playerPosition);
  const [isSolved, setIsSolved] = useState(false);

  const marker1Position = useMemo(() => {
    try {
      // @ts-ignore - Generated proto uses lowercase but runtime uses uppercase
      const x = parseInt(state?.marker1?.X);
      // @ts-ignore
      const y = parseInt(state?.marker1?.Y);
      return [x, y];
    } catch {
      console.error("failed to place marker");
    }

    return [-1, -1];
  }, [state?.marker1]);

  const marker2Position = useMemo(() => {
    try {
      // @ts-ignore
      const x = parseInt(state?.marker2?.X!);
      // @ts-ignore
      const y = parseInt(state?.marker2?.Y!);
      return [x, y];
    } catch (e) {
      console.error("failed to place marker", e);
    }

    return [-1, -1];
  }, [state?.marker2]);

  const goalPosition = useMemo(() => {
    try {
      // @ts-ignore
      const x = parseInt(state?.goalPosition?.X!);
      // @ts-ignore
      const y = parseInt(state?.goalPosition?.Y!);
      return [x, y];
    } catch (e) {
      console.error("failed to place goal", e);
    }

    return [-1, -1];
  }, [state?.goalPosition]);

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

        if (res.solved) {
          setIsSolved(true);
        }

        const newPlayerPosition =
          res.mazeInputResult?.mazeState?.playerPosition;
        if (newPlayerPosition) {
          setPlayerPosition(newPlayerPosition);
        }
      }
    },
    [sessionId, selectedBombId, selectedModuleId],
  );

  const emittingDot = useMemo(() => {
    const dot: MeshStandardMaterial = materials["MazeLight.Unlit"].clone();
    dot.emissiveIntensity = 0.3;
    dot.emissive.setHex(0xffffff);
    return dot;
  }, [materials]);

  useFrame((state, _) => {
    if (goalRef.current) {
      goalRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  const dotConfig = useMemo(() => {
    const config: Record<
      string,
      { material: MeshStandardMaterial; visible: boolean }
    > = {};

    try {
      // @ts-ignore
      const px = parseInt(playerPosition?.X);
      // @ts-ignore
      const py = parseInt(playerPosition?.Y);
      const gx = goalPosition?.[0];
      const gy = goalPosition?.[1];

      for (let x = 0; x <= 5; x++) {
        for (let y = 0; y <= 5; y++) {
          const key = `${x},${y}`;
          config[key] = {
            material:
              x === px && y === py ? emittingDot : materials["MazeLight.Unlit"],
            visible: !(x === gx && y === gy),
          };
        }
      }
    } catch {
      for (let x = 0; x <= 5; x++) {
        for (let y = 0; y <= 5; y++) {
          config[`${x},${y}`] = {
            material: materials["MazeLight.Unlit"],
            visible: true,
          };
        }
      }
    }

    return config;
  }, [playerPosition, goalPosition, emittingDot, materials]);

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
        material={dotConfig["0,0"].material}
        visible={dotConfig["0,0"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0001Dot"].geometry}
        material={dotConfig["0,1"].material}
        visible={dotConfig["0,1"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0002Dot"].geometry}
        material={dotConfig["0,2"].material}
        visible={dotConfig["0,2"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0003Dot"].geometry}
        material={dotConfig["0,3"].material}
        visible={dotConfig["0,3"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0004Dot"].geometry}
        material={dotConfig["0,4"].material}
        visible={dotConfig["0,4"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0005Dot"].geometry}
        material={dotConfig["0,5"].material}
        visible={dotConfig["0,5"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0100Dot"].geometry}
        material={dotConfig["1,0"].material}
        visible={dotConfig["1,0"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0101Dot"].geometry}
        material={dotConfig["1,1"].material}
        visible={dotConfig["1,1"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0102Dot"].geometry}
        material={dotConfig["1,2"].material}
        visible={dotConfig["1,2"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0103Dot"].geometry}
        material={dotConfig["1,3"].material}
        visible={dotConfig["1,3"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0104Dot"].geometry}
        material={dotConfig["1,4"].material}
        visible={dotConfig["1,4"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0105Dot"].geometry}
        material={dotConfig["1,5"].material}
        visible={dotConfig["1,5"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0200Dot"].geometry}
        material={dotConfig["2,0"].material}
        visible={dotConfig["2,0"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0201Dot"].geometry}
        material={dotConfig["2,1"].material}
        visible={dotConfig["2,1"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0202Dot"].geometry}
        material={dotConfig["2,2"].material}
        visible={dotConfig["2,2"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0203Dot"].geometry}
        material={dotConfig["2,3"].material}
        visible={dotConfig["2,3"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0204Dot"].geometry}
        material={dotConfig["2,4"].material}
        visible={dotConfig["2,4"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0205Dot"].geometry}
        material={dotConfig["2,5"].material}
        visible={dotConfig["2,5"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0300Dot"].geometry}
        material={dotConfig["3,0"].material}
        visible={dotConfig["3,0"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0301Dot"].geometry}
        material={dotConfig["3,1"].material}
        visible={dotConfig["3,1"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0302Dot"].geometry}
        material={dotConfig["3,2"].material}
        visible={dotConfig["3,2"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0303Dot"].geometry}
        material={dotConfig["3,3"].material}
        visible={dotConfig["3,3"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0304Dot"].geometry}
        material={dotConfig["3,4"].material}
        visible={dotConfig["3,4"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0305Dot"].geometry}
        material={dotConfig["3,5"].material}
        visible={dotConfig["3,5"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0400Dot"].geometry}
        material={dotConfig["4,0"].material}
        visible={dotConfig["4,0"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0401Dot"].geometry}
        material={dotConfig["4,1"].material}
        visible={dotConfig["4,1"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0402Dot"].geometry}
        material={dotConfig["4,2"].material}
        visible={dotConfig["4,2"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0403Dot"].geometry}
        material={dotConfig["4,3"].material}
        visible={dotConfig["4,3"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0404Dot"].geometry}
        material={dotConfig["4,4"].material}
        visible={dotConfig["4,4"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0405Dot"].geometry}
        material={dotConfig["4,5"].material}
        visible={dotConfig["4,5"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0500Dot"].geometry}
        material={dotConfig["5,0"].material}
        visible={dotConfig["5,0"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0501Dot"].geometry}
        material={dotConfig["5,1"].material}
        visible={dotConfig["5,1"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0502Dot"].geometry}
        material={dotConfig["5,2"].material}
        visible={dotConfig["5,2"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0503Dot"].geometry}
        material={dotConfig["5,3"].material}
        visible={dotConfig["5,3"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0504Dot"].geometry}
        material={dotConfig["5,4"].material}
        visible={dotConfig["5,4"].visible}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["0505Dot"].geometry}
        material={dotConfig["5,5"].material}
        visible={dotConfig["5,5"].visible}
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeGoal.geometry}
        material={materials["Maze.Goal"]}
        visible={goalPosition[0] !== -1}
        ref={goalRef}
        position={[
          -0.051 + GRID_OFFSET * goalPosition[0],
          0.033 - GRID_OFFSET * goalPosition[1],
          0.035,
        ]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeMarkerA.geometry}
        material={materials["Maze.MarkerA"]}
        visible={marker1Position[0] !== -1}
        position={[
          -0.051 + GRID_OFFSET * marker1Position[0],
          0.033 - GRID_OFFSET * marker1Position[1],
          0.035,
        ]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MazeMarkerB.geometry}
        material={materials["Maze.MarkerB"]}
        visible={marker2Position[0] !== -1}
        position={[
          -0.051 + 0.0165 * marker2Position[0],
          0.033 - 0.0165 * marker2Position[1],
          0.035,
        ]}
      />
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
        material={
          isSolved ? CustomMaterials.GreenLight : materials["Unlit light"]
        }
        position={[0.062, 0.064, 0.021]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </Module>
  );
}
