import { useGLTF } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
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

const ZOOM_DISTANCE = 0.3;
const PICKED_UP_HEIGHT = 0.2; // Height to lift the bomb when picked up
const PICKUP_ANIMATION_DURATION = 500; // 0.5 seconds in milliseconds

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
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const [pickupStartTime, setPickupStartTime] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Animate the bomb pickup/putdown
  useFrame(() => {
    if (pickupStartTime !== null) {
      const elapsed = Date.now() - pickupStartTime;
      const progress = Math.min(elapsed / PICKUP_ANIMATION_DURATION, 1);
      
      // Use easing function for smoother animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      // Determine start and end heights based on pickup state
      const startHeight = isPickedUp ? 0 : PICKED_UP_HEIGHT;
      const endHeight = isPickedUp ? PICKED_UP_HEIGHT : 0;
      
      setAnimatedHeight(startHeight + (endHeight - startHeight) * easeOut);
      
      if (progress >= 1) {
        setPickupStartTime(null);
      }
    }
  });

  // Handle picking up the bomb
  const handlePickUp = (e: ThreeEvent<MouseEvent>) => {
    console.log("handlePickUp called");
    if (!isPickedUp) {
      console.log("Picking up bomb - starting animation");
      e.stopPropagation();
      setIsPickedUp(true);
      setPickupStartTime(Date.now());
      // Reset position to center of view when picked up
      previousMousePosition.current.x = e.nativeEvent.clientX;
      previousMousePosition.current.y = e.nativeEvent.clientY;
    }
  };

  // Handle putting down the bomb
  const handlePutDown = () => {
    console.log("handlePutDown called");
    if (isPickedUp) {
      console.log("Putting down bomb - starting animation");
      setIsPickedUp(false);
      setPickupStartTime(Date.now());
      // Reset rotation when putting down
      setRotation([0, 0, 0]);
      // Reset camera if in module view
      if (selectedModuleId) {
        console.log("Resetting camera from module view");
        reset();
      }
    }
  };

  // Handle global click to put down the bomb when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      console.log("Global click detected:", { 
        isPickedUp, 
        isDragging, 
        selectedModuleId,
        target: e.target
      });
      
      if (isPickedUp && !isDragging) {
        // Check if the click was on a canvas element
        const canvasElement = document.querySelector("canvas");
        if (!canvasElement) return;

        // If the click target is the canvas itself, handle accordingly
        if (e.target === canvasElement) {
          // If in module view, reset to picked up view
          if (selectedModuleId) {
            console.log("Resetting from module view to picked up view");
            reset();
          } else {
            // Put the bomb down
            console.log("Putting bomb down from global click");
            handlePutDown();
          }
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

    const handleGlobalPointerUp = () => {
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
  }, [isPickedUp, isDragging, selectedModuleId, rotation, handlePutDown]);

  // Handle mouse movement for rotation
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isPickedUp) {
      e.stopPropagation();
      setIsDragging(true);
      previousMousePosition.current.x = e.nativeEvent.clientX;
      previousMousePosition.current.y = e.nativeEvent.clientY;

      // Capture the pointer to ensure we keep receiving events
      // Using document.body for more reliable capture
      document.body.setPointerCapture(e.nativeEvent.pointerId);
    }
  };

  function onModuleClick(selected: THREE.Object3D[], event?: THREE.Event) {
    console.log("onModuleClick called:", { 
      selected: selected?.length, 
      isPickedUp, 
      selectedModuleId,
      event: event?.type,
      eventObject: event?.object
    });
    
    if (!isPickedUp) {
      console.log("Bomb not picked up, ignoring module click");
      return;
    }
    
    // Try to get the clicked object from the event first, then from selected array
    let clickedObject: THREE.Object3D | null = null;
    
    if (event?.object) {
      clickedObject = event.object;
      console.log("Using event object:", clickedObject);
    } else if (selected && selected[0]) {
      clickedObject = selected[0];
      console.log("Using selected object:", clickedObject);
    }
    
    if (!clickedObject) {
      console.log("No clicked object found");
      return;
    }

    const module = getModuleRoot(clickedObject);
    console.log("Module root found:", module);
    console.log("Module userData:", module.userData);
    
    const moduleId = module.userData["moduleId"];
    console.log("Module ID:", moduleId);
    
    if (!moduleId) {
      console.log("No module ID found in userData");
      return;
    }
    
    // If already viewing this module, return to normal view
    if (selectedModuleId === moduleId) {
      console.log("Resetting from same module");
      reset();
      return;
    }

    const pos = module.getWorldPosition(new THREE.Vector3());
    
    // Calculate the world position of the bomb (parent group)
    const bombCenter = new THREE.Vector3();
    if (groupRef.current) {
      groupRef.current.getWorldPosition(bombCenter);
    }
    
    // Calculate direction from bomb center to module
    const direction = pos.clone().sub(bombCenter).normalize();
    
    // Position camera slightly further back for better view
    const cameraPosition = pos.clone().add(direction.multiplyScalar(ZOOM_DISTANCE));
    
    console.log("Zooming to module:", {
      moduleId,
      modulePos: pos,
      bombCenter,
      direction,
      cameraPosition
    });
    
    // Zoom to the module
    zoomToModule(
      moduleId,
      cameraPosition,
      pos // Look at the module position
    );

    // Stop event propagation to prevent bomb being put down
    if (isDragging) {
      setIsDragging(false);
    }
  }

  return (
    <>
      <group
        position={[0, 0.73 + animatedHeight, 0]}
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
              onChangePointerDown={(selected, event) => {
                console.log("Select onChangePointerDown:", { 
                  selected: selected.length, 
                  event: event?.type 
                });
                if (selected.length > 0) {
                  onModuleClick(selected, event);
                }
              }}
              onChangePointerUp={(selected, event) => {
                console.log("Select onChangePointerUp:", { 
                  selected: selected.length, 
                  event: event?.type 
                });
                if (selected.length > 0) {
                  onModuleClick(selected, event);
                }
              }}
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
