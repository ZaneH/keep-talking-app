import { useEffect, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../hooks/use-game-store";
import { useModuleModel } from "../hooks/use-module-model";
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

const ZOOM_DISTANCE = 0.3;
const PICKED_UP_HEIGHT = 0.2; // Height to lift the bomb when picked up
const PICKUP_ANIMATION_DURATION = 250; // 0.5 seconds in milliseconds

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

export default function Bomb({
  bombId: _bombId,
  modules = {},
  startedAt,
  timerDuration,
  indicators: _indicators = {},
  ports: _ports = [],
}: BombProps) {
  const bombRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useModuleModel("bomb");
  const { selectedModuleId, zoomToModule, reset } = useGameStore();

  // Local state for bomb interaction
  const [pickupStartTime, setPickupStartTime] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPickedUp, setIsPickedUp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const dragStartRotation = useRef<[number, number, number]>([0, 0, 0]);

  const modulesList = Object.values(modules || {});

  // Animation frame for pickup/putdown
  useFrame(() => {
    if (pickupStartTime !== null) {
      const elapsed = Date.now() - pickupStartTime;
      const progress = Math.min(elapsed / PICKUP_ANIMATION_DURATION, 1);
      
      // Smooth easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      
      if (isPickedUp) {
        // Animating up
        setAnimatedHeight(eased * PICKED_UP_HEIGHT);
      } else {
        // Animating down
        setAnimatedHeight((1 - eased) * PICKED_UP_HEIGHT);
      }
      
      if (progress >= 1) {
        setPickupStartTime(null);
        setIsAnimating(false);
        if (!isPickedUp) {
          setRotation([0, 0, 0]); // Reset rotation when put down
        }
      }
    }
  });

  const handleBombClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    
    if (!isPickedUp && !isAnimating) {
      console.log("Picking up bomb");
      setIsPickedUp(true);
      setIsAnimating(true);
      setPickupStartTime(Date.now());
    }
  };

  // Global pointer event handlers for dragging anywhere in viewport
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (isPickedUp && !isAnimating) {
        setIsDragging(true);
        dragStartRotation.current = [...rotation];
        previousMousePosition.current = { x: event.clientX, y: event.clientY };
        console.log("Started dragging globally");
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (isDragging && isPickedUp) {
        const deltaX = event.clientX - previousMousePosition.current.x;
        const deltaY = event.clientY - previousMousePosition.current.y;
        
        // Sensitivity factor for rotation
        const sensitivity = 0.01;
        
        // Update rotation incrementally based on mouse delta
        setRotation((prevRotation) => {
          const newRotationX = prevRotation[0] + deltaY * sensitivity;
          const newRotationY = prevRotation[1] + deltaX * sensitivity;
          
          // Clamp X rotation to prevent flipping upside down
          const clampedRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, newRotationX));
          
          return [clampedRotationX, newRotationY, prevRotation[2]];
        });
        
        // Update the starting position for next frame
        previousMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
        console.log("Stopped dragging globally");
      }
    };

    if (isPickedUp) {
      document.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      
      return () => {
        document.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isPickedUp, isAnimating, isDragging, rotation]);

  // Global click handler to put down bomb when clicking outside
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (isPickedUp && !isAnimating && !isDragging) {
        console.log("Putting down bomb");
        setIsPickedUp(false);
        setIsAnimating(true);
        setPickupStartTime(Date.now());
      }
    };

    if (isPickedUp) {
      document.addEventListener('click', handleGlobalClick);
      return () => document.removeEventListener('click', handleGlobalClick);
    }
  }, [isPickedUp, isAnimating, isDragging]);

  const handleModuleClick = (moduleId: string) => {
    if (isPickedUp) {
      console.log("Zooming to module:", moduleId);
      zoomToModule(moduleId);
    }
  };

  const renderModule = (module: Module) => {
    const moduleProps = {
      moduleId: module.id as string,
      position: module.position,
      onClick: handleModuleClick,
    };

    switch (module.type) {
      case ModuleModuleType.WIRES:
        return (
          <WiresModule
            key={module.id}
            state={module.wiresState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.BIG_BUTTON:
        return (
          <BigButtonModule
            key={module.id}
            state={module.bigButtonState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.KEYPAD:
        return (
          <KeypadModule
            key={module.id}
            state={module.keypadState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.SIMON:
        return (
          <SimonModule
            key={module.id}
            state={module.simonState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.WHOS_ON_FIRST:
        return (
          <WhosOnFirstModule
            key={module.id}
            state={module.whosOnFirstState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.MEMORY:
        return (
          <MemoryModule
            key={module.id}
            state={module.memoryState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.MORSE:
        return (
          <MorseModule
            key={module.id}
            state={module.morseState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.PASSWORD:
        return (
          <PasswordModule
            key={module.id}
            state={module.passwordState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.NEEDY_VENT_GAS:
        return (
          <NeedyVentGasModule
            key={module.id}
            state={module.needyVentGasState}
            {...moduleProps}
          />
        );
      case ModuleModuleType.CLOCK:
        return <ClockModule key={module.id} {...moduleProps} />;
      default:
        console.warn("Unknown module type:", module.type);
        return null;
    }
  };

  return (
    <BombProvider startedAt={startedAt} timerDuration={timerDuration}>
      <group ref={bombRef}>
        <group 
          position={[0, 0.73 + animatedHeight, 0]} 
          rotation={rotation}
          onClick={handleBombClick}
          style={{ cursor: isPickedUp ? (isDragging ? 'grabbing' : 'grab') : 'pointer' }}
        >
          {/* The bomb shell */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Case.geometry}
            material={materials.Silver}
            scale={[0.911, 1, 1]}
          >
            <group scale={[1.098, 1, 1]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.H.geometry}
                material={materials.Silver}
                position={[0, 0, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.H001.geometry}
                material={materials.Silver}
                position={[0, 0, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.H002.geometry}
                material={materials.Silver}
                position={[0.001, 0, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.V.geometry}
                material={materials.Silver}
                position={[0.005, 0, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.V003.geometry}
                material={materials.Silver}
                position={[-0.007, 0, 0]}
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

          {modulesList.map(renderModule)}
        </group>
      </group>
    </BombProvider>
  );
}
