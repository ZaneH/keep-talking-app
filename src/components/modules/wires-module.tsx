import type { ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Color } from "../../generated/proto/common.pb";
import type { WiresState } from "../../generated/proto/wires_module.pb";
import { useGameStore } from "../../hooks/use-game-store";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import { GameService } from "../../services/api";
import { useHighlight } from "../highlight-provider";
import { InteractiveMesh } from "../interactive-mesh";
import Module, { type BaseModuleProps } from "./module";

const WIRE_COLOR_TO_MATERIAL: Record<string, string> = {
  [Color.RED]: "RedWire",
  [Color.BLUE]: "BlueWire",
  [Color.YELLOW]: "YellowWire",
  [Color.BLACK]: "BlackWire",
  [Color.WHITE]: "WhiteWire",
  [Color.ORANGE]: "OrangeWire",
  [Color.GREEN]: "GreenWire",
  [Color.PINK]: "PinkWire",
};

type ThreeNumbers = [number, number, number];

export default function SimpleWiresModule({
  moduleId,
  name = "simple-wires",
  position,
  state,
}: BaseModuleProps & {
  state?: WiresState;
}) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const { zoomState, sessionId, selectedBombId, selectedModuleId } =
    useGameStore();
  const [isSolved, setIsSolved] = useState(false);

  const [wireConfig, setWireConfig] = useState<{
    wires: Array<{
      color: Color;
      cut: boolean;
      visible: boolean;
      position: number;
    }>;
  }>({ wires: [] });

  useEffect(() => {
    if (state?.wires) {
      const newWireConfig = Array(6)
        .fill(null)
        .map(() => ({
          color: Color.RED,
          cut: false,
          visible: false,
          position: -1,
        }));

      state.wires.forEach((wire, _) => {
        if (wire.position !== undefined) {
          newWireConfig[wire.position] = {
            color: wire.wireColor!,
            cut: wire.isCut || false,
            visible: true,
            position: wire.position,
          };
        }
      });

      setWireConfig({ wires: newWireConfig });
    }
  }, [state]);

  const onWireSelect = useCallback(
    async (event: ThreeEvent<PointerEvent>) => {
      if (isSolved) return;
      if (selectedModuleId !== moduleId) return;

      const object = event.object;
      if (!object) return;

      const position = object.userData.position;
      if (
        !wireConfig.wires[position].visible ||
        wireConfig.wires[position].cut
      ) {
        return;
      }

      const resp = await GameService.SendInput({
        bombId: selectedBombId!,
        sessionId: sessionId!,
        moduleId,
        wiresInput: {
          wirePosition: position,
        },
      });

      if (resp?.solved) {
        setIsSolved(true);
      }

      setWireConfig((prev) => {
        const newWires = [...prev.wires];
        newWires[position] = { ...newWires[position], cut: true };
        return { wires: newWires };
      });
    },
    [
      zoomState,
      selectedBombId,
      sessionId,
      moduleId,
      wireConfig,
      selectedModuleId,
      isSolved,
    ]
  );

  const wirePositions = [
    {
      position: [-0.057, -0.011, 0.05],
      normal: "Wire1Normal",
      cut: "Wire1Cut",
    },
    {
      position: [-0.034, -0.008, 0.037],
      normal: "Wire2Normal",
      cut: "Wire2Cut",
    },
    {
      position: [-0.016, -0.008, 0.037],
      normal: "Wire3Normal",
      cut: "Wire3Cut",
    },
    {
      position: [0.006, -0.008, 0.037],
      normal: "Wire4Normal",
      cut: "Wire4Cut",
    },
    {
      position: [0.023, -0.008, 0.037],
      normal: "Wire5Normal",
      cut: "Wire5Cut",
    },
    {
      position: [0.04, -0.008, 0.037],
      normal: "Wire6Normal",
      cut: "Wire6Cut",
    },
  ];

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WiresModule.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BigStrip.geometry}
          material={materials["Plastic Dark"]}
          position={[-0.001, -0.055, 0.021]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug1001.geometry}
            material={materials["Plastic Light"]}
            position={[-0.001, -0.053, 0.013]}
            rotation={[0, 0, -Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2001.geometry}
            material={materials["Plastic Light"]}
            position={[-0.001, -0.032, 0.013]}
            rotation={[0, 0, -Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3001.geometry}
            material={materials["Plastic Light"]}
            position={[-0.001, -0.01, 0.013]}
            rotation={[0, 0, -Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4001.geometry}
            material={materials["Plastic Light"]}
            position={[-0.001, 0.011, 0.013]}
            rotation={[0, 0, -Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5001.geometry}
            material={materials["Plastic Light"]}
            position={[-0.001, 0.033, 0.013]}
            rotation={[0, 0, -Math.PI]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6001.geometry}
            material={materials["Plastic Light"]}
            position={[-0.001, 0.055, 0.013]}
            rotation={[0, 0, -Math.PI]}
            scale={0.482}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallStrip.geometry}
          material={materials["Plastic Dark"]}
          position={[-0.011, 0.031, 0.021]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug1.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.043, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug2.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.026, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug3.geometry}
            material={materials["Plastic Light"]}
            position={[0, -0.008, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug4.geometry}
            material={materials["Plastic Light"]}
            position={[0, 0.01, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug5.geometry}
            material={materials["Plastic Light"]}
            position={[0, 0.027, 0.013]}
            scale={0.482}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plug6.geometry}
            material={materials["Plastic Light"]}
            position={[0, 0.045, 0.013]}
            scale={0.482}
          />
        </mesh>

        <group>
          {wireConfig.wires.map(
            (wire, _) =>
              wire.visible && (
                <CuttableWire
                  key={wire.position}
                  position={wire.position}
                  isCut={wire.cut}
                  disabled={isSolved}
                  uncutWire={
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        nodes[wirePositions[wire.position].normal].geometry
                      }
                      material={materials[WIRE_COLOR_TO_MATERIAL[wire.color]]}
                      position={
                        wirePositions[wire.position].position as ThreeNumbers
                      }
                      onPointerUp={onWireSelect}
                    />
                  }
                  cutWire={
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        nodes[wirePositions[wire.position].cut].geometry
                      }
                      material={materials[WIRE_COLOR_TO_MATERIAL[wire.color]]}
                      position={
                        wirePositions[wire.position].position as ThreeNumbers
                      }
                    />
                  }
                />
              )
          )}
        </group>

        <mesh
          castShadow
          geometry={nodes.Light002.geometry}
          material={
            isSolved ? materials["GreenLight"] : materials["Unlit light"]
          }
          position={[0.061, 0.062, 0.021]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
      </mesh>
    </Module>
  );
}

const CuttableWire = ({
  position,
  uncutWire,
  cutWire,
  isCut,
  disabled,
}: {
  position: number;
  uncutWire: React.ReactNode;
  cutWire: React.ReactNode;
  isCut: boolean;
  disabled: boolean;
}) => {
  const wireRef = useRef<THREE.Mesh>(null);
  const { unhighlight } = useHighlight();

  useEffect(() => {
    if (isCut) {
      unhighlight(wireRef);
    }
  }, [isCut, unhighlight]);

  return (
    <group>
      {isCut ? (
        <mesh {...(cutWire as any).props} ref={wireRef} />
      ) : (
        <InteractiveMesh
          {...(uncutWire as any).props}
          ref={wireRef}
          disabled={disabled}
          userData={{ position }}
        />
      )}
    </group>
  );
};
