import { useRef, useState } from "react";
import useModuleHighlight from "../../hooks/use-module-highlight";
import { useModuleModel } from "../../hooks/use-module-model";
import Module, { type BaseModuleProps } from "./module";
import {
  Symbol,
  type KeypadState,
} from "../../generated/proto/keypad_module.pb";
import { Text } from "@react-three/drei";
import { pbSymbolToUnicode } from "../../utils/pb-symbol-to-unicode";
import { GameService } from "../../services/api";
import { useGameStore } from "../../hooks/use-game-store";
import { CustomMaterials } from "./custom-materials";
import { type ThreeEvent } from "@react-three/fiber";

const FONT_SIZE = 0.03;
const FONT_COLOR = "#000000";
const FONT_FAMILY = "/fonts/Inter.ttf";

export default function KeypadModule({
  moduleId,
  name = "keypad",
  position,
  state,
}: BaseModuleProps & {
  state?: KeypadState;
}) {
  const { nodes, materials } = useModuleModel(name);
  const meshRef = useRef<any>(null);
  const { pointerHandlers } = useModuleHighlight({ id: moduleId, meshRef });
  const { selectedModuleId, selectedBombId, sessionId } = useGameStore();
  const [isSolved, setIsSolved] = useState<boolean>(false);

  const [litState, setLitState] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const onKeypadClick = async (event: ThreeEvent<MouseEvent>) => {
    if (selectedModuleId !== moduleId) return;
    if (!event.object) return;

    const object = event.object;
    if (!object.userData.symbol) {
      console.warn("No symbol found on the clicked object");
      return;
    }

    const res = await GameService.SendInput({
      sessionId: sessionId,
      bombId: selectedBombId,
      moduleId: selectedModuleId,
      keypadInput: {
        symbol: object.userData.symbol as Symbol,
      },
    });

    const activatedSymbols =
      res.keypadInputResult?.keypadState?.activatedSymbols;
    setLitState((prev) => {
      const displayedSymbols = state?.displayedSymbols || [];
      const newState = [...prev];
      const brSymbol = displayedSymbols[0];
      const blSymbol = displayedSymbols[1];
      const tlSymbol = displayedSymbols[2];
      const trSymbol = displayedSymbols[3];

      newState[0] = activatedSymbols?.includes(brSymbol) || false;
      newState[1] = activatedSymbols?.includes(blSymbol) || false;
      newState[2] = activatedSymbols?.includes(tlSymbol) || false;
      newState[3] = activatedSymbols?.includes(trSymbol) || false;

      return newState;
    });

    if (res.solved) {
      setIsSolved(true);
    }
  };

  return (
    <Module id={moduleId} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KeypadModule_1.geometry}
        material={materials.Silver}
        scale={[1.028, 1.028, 1]}
        ref={meshRef}
        {...pointerHandlers}
      >
        <Text
          fontSize={FONT_SIZE}
          color={FONT_COLOR}
          font={FONT_FAMILY}
          position={[0.017, -0.041, 0.036]}
          userData={{ symbol: state?.displayedSymbols?.[0] }}
          onClick={onKeypadClick}
        >
          {pbSymbolToUnicode(state?.displayedSymbols?.[0])}
        </Text>
        <Text
          fontSize={FONT_SIZE}
          color={FONT_COLOR}
          font={FONT_FAMILY}
          position={[-0.044, -0.041, 0.036]}
          userData={{ symbol: state?.displayedSymbols?.[1] }}
          onClick={onKeypadClick}
        >
          {pbSymbolToUnicode(state?.displayedSymbols?.[1])}
        </Text>
        <Text
          fontSize={FONT_SIZE}
          color={FONT_COLOR}
          font={FONT_FAMILY}
          position={[-0.044, 0.02, 0.036]}
          userData={{ symbol: state?.displayedSymbols?.[2] }}
          onClick={onKeypadClick}
        >
          {pbSymbolToUnicode(state?.displayedSymbols?.[2])}
        </Text>
        <Text
          fontSize={FONT_SIZE}
          color={FONT_COLOR}
          font={FONT_FAMILY}
          position={[0.017, 0.02, 0.036]}
          userData={{ symbol: state?.displayedSymbols?.[3] }}
          onClick={onKeypadClick}
        >
          {pbSymbolToUnicode(state?.displayedSymbols?.[3])}
        </Text>
        <mesh
          userData={{ symbol: state?.displayedSymbols?.[0] }}
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternBR.geometry}
          material={materials.TanButton}
          position={[0.017, -0.044, 0.032]}
          scale={[0.972, 0.972, 1]}
          onClick={onKeypadClick}
        />
        <mesh
          userData={{ symbol: state?.displayedSymbols?.[1] }}
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternBL.geometry}
          material={materials.TanButton}
          position={[-0.044, -0.044, 0.032]}
          scale={[0.972, 0.972, 1]}
          onClick={onKeypadClick}
        />
        <mesh
          userData={{ symbol: state?.displayedSymbols?.[2] }}
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternTL.geometry}
          material={materials.TanButton}
          position={[-0.044, 0.017, 0.032]}
          scale={[0.972, 0.972, 1]}
          onClick={onKeypadClick}
        />
        <mesh
          userData={{ symbol: state?.displayedSymbols?.[3] }}
          castShadow
          receiveShadow
          geometry={nodes.KeypadPatternTR.geometry}
          material={materials.TanButton}
          position={[0.017, 0.017, 0.032]}
          scale={[0.972, 0.972, 1]}
          onClick={onKeypadClick}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitBR.geometry}
          material={
            litState[0]
              ? CustomMaterials.GreenLight
              : materials["Backlight.Dark"]
          }
          position={[0.018, -0.064, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitBL.geometry}
          material={
            litState[1]
              ? CustomMaterials.GreenLight
              : materials["Backlight.Dark"]
          }
          position={[-0.044, -0.064, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitTL.geometry}
          material={
            litState[2]
              ? CustomMaterials.GreenLight
              : materials["Backlight.Dark"]
          }
          position={[-0.044, -0.003, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LitTR.geometry}
          material={
            litState[3]
              ? CustomMaterials.GreenLight
              : materials["Backlight.Dark"]
          }
          position={[0.018, -0.003, 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.972, 1, 0.972]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Light006.geometry}
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
