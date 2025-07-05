import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Indicator, Port } from "../generated/proto/bomb.pb";
import { ModuleModuleType, type Module } from "../generated/proto/modules.pb";
import { useModuleModel } from "../hooks/use-module-model";
import { useGameStore } from "../hooks/use-game-store";
import BombProvider from "./bomb-provider";
import {
  BigButtonModule,
  ClockModule,
  KeypadModule,
  PasswordModule,
  SimonModule,
  WhosOnFirstModule,
  WiresModule,
} from "./modules";
import MemoryModule from "./modules/memory-module";
import MorseModule from "./modules/morse-module";
import NeedyVentGasModule from "./modules/needy-vent-gas";
import { positionToCoords } from "../utils/position-to-coords";

interface Props {
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

function BombSimple({ modules, startedAt, timerDuration }: Props) {
  const { camera, scene } = useThree();

  const setZoomState = useGameStore((s) => s.setZoomState);
  const { zoomToModule, selectedModuleId } = useGameStore();

  const [isPickedUp, setIsPickedUp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  const [animatedHeight, setAnimatedHeight] = useState(0);

  const lastPointerPosition = useRef<{ x: number; y: number } | null>(null);

  const bombRef = useRef<THREE.Group>(null);

  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  const defaultRotation: [number, number, number] = [0, 0, 0];

  function isBombClicked(event: PointerEvent): boolean {
    if (!bombRef.current) return false;

    const rect = (event.target as Element).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    pointer.current.set(x, y);

    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    const bombGroup = bombRef.current;
    for (let i = 0; i < intersects.length; i++) {
      const obj = intersects[i].object;
      // If the object is the bomb or a child of the bomb group
      if (obj === bombGroup || bombGroup.children.includes(obj)) {
        return true;
      }
    }
    return false;
  }

  function isModuleClicked(event: PointerEvent): string | null {
    if (!bombRef.current) return null;

    const rect = (event.target as Element).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    pointer.current.set(x, y);

    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
      const obj = intersects[i].object;
      let parent = obj;
      while (parent) {
        if (parent.userData && parent.userData.moduleId) {
          return parent.userData.moduleId as string;
        }
        parent = parent.parent as THREE.Object3D;
      }
    }
    return null;
  }

  useFrame(() => {
    const targetY = isPickedUp ? 1 : 0.73;
    const speed = 0.1;
    setAnimatedHeight((prev) => prev + (targetY - prev) * speed);

    if (!isPickedUp) {
      setRotation((prev) => {
        const rx = prev[0] + (defaultRotation[0] - prev[0]) * speed;
        const ry = prev[1] + (defaultRotation[1] - prev[1]) * speed;
        const rz = prev[2] + (defaultRotation[2] - prev[2]) * speed;
        return [rx, ry, rz];
      });
    }

    if (bombRef.current) {
      bombRef.current.position.y = animatedHeight;
      bombRef.current.rotation.x = rotation[0];
      bombRef.current.rotation.y = rotation[1];
      bombRef.current.rotation.z = rotation[2];
    }
  });

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!isPickedUp) {
        if (isBombClicked(event)) {
          setIsPickedUp(true);
          event.preventDefault();
        }
      } else {
        // Bomb is already picked up
        // 1) Check if user clicked on a module => rotate bomb forward & zoom in
        const modId = isModuleClicked(event);
        if (modId) {
          const modulePosition = modules?.[modId]?.position;
          const { position } = positionToCoords(modulePosition!); // TODO: handle undefined position / fix type
          setRotation(defaultRotation);

          position.z = 0.5;
          // Add offset of picked up bomb
          position.y += 0.25;

          const lookAt = new THREE.Vector3(position.x, position.y, position.z);
          zoomToModule(modId, position, lookAt);
          event.preventDefault();
          return;
        }

        // 2) If user clicked bomb => start dragging
        if (isBombClicked(event)) {
          setIsDragging(true);
          lastPointerPosition.current = { x: event.clientX, y: event.clientY };
          event.preventDefault();
        }
        // 3) Otherwise => clicked outside => put it down
        else {
          setIsPickedUp(false);
          setIsDragging(false);
        }
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (isPickedUp && isDragging) {
        // Rotate the bomb based on pointer delta
        if (lastPointerPosition.current) {
          const dx = event.clientX - lastPointerPosition.current.x;
          const dy = event.clientY - lastPointerPosition.current.y;

          const rotateSpeed = 0.01;
          setRotation((prev) => {
            let [rx, ry, rz] = prev;
            rx += dy * rotateSpeed; // rotate around X-axis
            ry += dx * rotateSpeed; // rotate around Y-axis
            return [rx, ry, rz];
          });
        }
        lastPointerPosition.current = { x: event.clientX, y: event.clientY };
      }
    }

    function handlePointerUp() {
      if (isPickedUp && isDragging) {
        setIsDragging(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [camera, scene, isPickedUp, isDragging, setZoomState, selectedModuleId]);

  const { nodes, materials } = useModuleModel("bomb");

  return (
    <group ref={bombRef}>
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

      <BombProvider startedAt={startedAt} timerDuration={timerDuration}>
        {Object.entries(modules || {}).map(([moduleId, mod]) => (
          <group key={moduleId} userData={{ moduleId }}>
            {renderModule(moduleId, mod)}
          </group>
        ))}
      </BombProvider>
    </group>
  );
}

function renderModule(key?: string, module?: Module) {
  if (!module) return null;

  switch (module.type) {
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

export default BombSimple;
