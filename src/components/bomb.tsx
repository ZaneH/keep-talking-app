import { Select, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "../hooks/use-game-store";
import { getModuleRoot } from "../utils/node-finder";
import {
  BigButtonModule,
  ClockModule,
  PasswordModule,
  SimonModule,
  WiresModule,
  KeypadModule,
  WhosOnFirstModule,
} from "./modules";
import { ModuleModuleType, type Module } from "../generated/proto/modules.pb";
import type { Indicator, Port } from "../generated/proto/bomb.pb";
import BombProvider from "./bomb-provider";
import MemoryModule from "./modules/memory-module";
import MorseModule from "./modules/morse-module";
import NeedyVentGasModule from "./modules/needy-vent-gas";
import { useEffect, useRef, useState } from "react";

const ZOOM_DISTANCE = 0.2;
const PICKED_UP_HEIGHT = 0.2; // Height to lift the bomb when picked up

interface BombProps {
  bombId?: string;
  modules?: { [key: string]: Module };
  startedAt?: number;
  timerDuration?: number;
  batteries?: number;
  serialNumber?: string;
  strikeCount?: number;
  maxStrikes?: number;
  ports?: Port[];
  indicators?: { [key: string]: Indicator };
}

export default function Bomb({ modules, startedAt, timerDuration }: BombProps) {
  const { nodes, materials } = useGLTF("/bomb.glb") as any;
  const { zoomToModule, selectedModuleId, reset } = useGameStore();
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPickedUp, setIsPickedUp] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Handle picking up the bomb
  const handlePickUp = (e: THREE.Event) => {
    if (!isPickedUp) {
      e.stopPropagation();
      setIsPickedUp(true);
      // Reset position to center of view when picked up
      previousMousePosition.current.x = e.nativeEvent.clientX;
      previousMousePosition.current.y = e.nativeEvent.clientY;
    }
  };

  // Handle putting down the bomb
  const handlePutDown = () => {
    if (isPickedUp) {
      setIsPickedUp(false);
      // Reset rotation when putting down
      setRotation([0, 0, 0]);
      // Reset camera if in module view
      if (selectedModuleId) {
        reset(null);
      }
    }
  };

  // Handle global click to put down the bomb when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isPickedUp && !isDragging) {
        // Check if the click was on a canvas element
        const canvasElement = document.querySelector("canvas");
        if (!canvasElement) return;

        // If the click target is the canvas itself, put the bomb down
        if (e.target === canvasElement) {
          handlePutDown();
        }
      }
    };

    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (isDragging && isPickedUp) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        setRotation([
          rotation[0] + deltaY * 0.01,
          rotation[1] + deltaX * 0.01,
          rotation[2],
        ]);

        previousMousePosition.current.x = e.clientX;
        previousMousePosition.current.y = e.clientY;
      }
    };

    const handleGlobalPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("pointermove", handleGlobalPointerMove);
    window.addEventListener("pointerup", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
    };
  }, [isPickedUp, isDragging, selectedModuleId, rotation]);

  // Handle mouse movement for rotation
  const handlePointerDown = (e: THREE.Event) => {
    if (isPickedUp) {
      e.stopPropagation();
      setIsDragging(true);
      previousMousePosition.current.x = e.nativeEvent.clientX;
      previousMousePosition.current.y = e.nativeEvent.clientY;

      // Capture the pointer to ensure we keep receiving events
      // Using document.body for more reliable capture
      document.body.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: THREE.Event) => {
    if (isDragging && isPickedUp) {
      const deltaX = e.nativeEvent.clientX - previousMousePosition.current.x;
      const deltaY = e.nativeEvent.clientY - previousMousePosition.current.y;

      setRotation([
        rotation[0] + deltaY * 0.01,
        rotation[1] + deltaX * 0.01,
        rotation[2],
      ]);

      previousMousePosition.current.x = e.nativeEvent.clientX;
      previousMousePosition.current.y = e.nativeEvent.clientY;
    }
  };

  const handlePointerUp = (e: THREE.Event) => {
    if (isDragging) {
      // Release the pointer capture from document.body
      document.body.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  function onModuleClick(selected: THREE.Object3D[]) {
    if (!selected || !selected[0] || !isPickedUp) return;

    const module = getModuleRoot(selected[0]);
    const moduleId = module.userData["moduleId"];
    if (selectedModuleId === moduleId) {
      return;
    }

    const pos = module.getWorldPosition(new THREE.Vector3());

    // Zoom to the module
    zoomToModule(
      moduleId,
      new THREE.Vector3(pos.x, pos.y, pos.z + ZOOM_DISTANCE),
      null, // Don't use camera controls, we're handling rotation ourselves
    );

    // Stop event propagation to prevent bomb being put down
    if (isDragging) {
      setIsDragging(false);
    }
  }

  return (
    <>
      <group
        position={[0, isPickedUp ? 0.73 + PICKED_UP_HEIGHT : 0.73, 0]}
        rotation={isPickedUp ? rotation : [0, 0, 0]}
        ref={groupRef}
      >
        {/* The bomb shell with modules attached */}
        <group
          name="BombWithModules"
          dispose={null}
          onClick={isPickedUp ? undefined : handlePickUp}
          onPointerDown={isPickedUp ? handlePointerDown : undefined}
        >
          {/* The bomb shell */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Case.geometry}
            material={materials.Silver}
            scale={[0.911, 1, 1]}
          >
            <group position={[0, -0.732, 0]} scale={[1.098, 1, 1]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.H.geometry}
                material={materials.Silver}
                position={[0, 0.73, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.H001.geometry}
                material={materials.Silver}
                position={[0, 0.73, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.H002.geometry}
                material={materials.Silver}
                position={[0.001, 0.73, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.V.geometry}
                material={materials.Silver}
                position={[0.005, 0.732, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.V003.geometry}
                material={materials.Silver}
                position={[-0.007, 0.732, 0]}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Backplate.geometry}
              material={materials.Silver}
              scale={[1.098, 1, 1]}
            />
          </mesh>

          {/* Modules */}
          <BombProvider startedAt={startedAt} timerDuration={timerDuration}>
            <Select
              onChangePointerUp={onModuleClick}
              border={isPickedUp ? "1px solid #55aaff" : "none"}
              backgroundColor={
                isPickedUp ? "rgba(75, 160, 255, 0.1)" : "transparent"
              }
            >
              {Object.entries(modules || {}).map(([moduleId, module]) => {
                return renderModule(moduleId, module);
              })}
            </Select>
          </BombProvider>
        </group>
      </group>
    </>
  );
}

function renderModule(key?: string, module?: Module) {
  switch (module?.type) {
    case ModuleModuleType.BIG_BUTTON:
      return (
        <BigButtonModule
          key={key}
          moduleId={module.id!}
          state={module.bigButtonState}
          position={module.position}
        />
      );
    case ModuleModuleType.WIRES:
      return (
        <WiresModule
          key={key}
          moduleId={module.id!}
          state={module.wiresState}
          position={module.position}
        />
      );
    case ModuleModuleType.CLOCK:
      return (
        <ClockModule
          key={key}
          moduleId={module.id!}
          position={module.position}
        />
      );
    case ModuleModuleType.PASSWORD:
      return (
        <PasswordModule
          key={key}
          moduleId={module.id!}
          state={module.passwordState}
          position={module.position}
        />
      );
    case ModuleModuleType.KEYPAD:
      return (
        <KeypadModule
          key={key}
          moduleId={module.id!}
          state={module.keypadState}
          position={module.position}
        />
      );
    case ModuleModuleType.SIMON:
      return (
        <SimonModule
          key={key}
          moduleId={module.id!}
          state={module.simonState}
          position={module.position}
        />
      );
    case ModuleModuleType.WHOS_ON_FIRST:
      return (
        <WhosOnFirstModule
          key={key}
          moduleId={module.id!}
          state={module.whosOnFirstState}
          position={module.position}
        />
      );
    case ModuleModuleType.MEMORY:
      return (
        <MemoryModule
          key={key}
          moduleId={module.id!}
          state={module.memoryState}
          position={module.position}
        />
      );
    case ModuleModuleType.MORSE:
      return (
        <MorseModule
          key={key}
          moduleId={module.id!}
          state={module.morseState}
          position={module.position}
        />
      );
    case ModuleModuleType.NEEDY_VENT_GAS:
      return (
        <NeedyVentGasModule
          key={key}
          moduleId={module.id!}
          state={module.needyVentGasState}
          position={module.position}
        />
      );
    default:
      return null;
  }
}
