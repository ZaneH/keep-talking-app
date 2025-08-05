import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
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
import {
  BOMB_HEIGHT,
  CAMERA_DISTANCE_ZOOMED,
  CAMERA_HEIGHT,
} from "../utils/constants";

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

function getClosestForwardRotationRadians(currentRotation: number): number {
  const distTo0 = Math.abs(shortestAngularDelta(currentRotation, 0));
  const distToPi = Math.abs(shortestAngularDelta(currentRotation, Math.PI));

  return distTo0 < distToPi ? 0 : Math.PI;
}

function shortestAngularDelta(from: number, to: number): number {
  const TWO_PI = Math.PI * 2;
  let delta = (to - from) % TWO_PI;
  if (delta > Math.PI) delta -= TWO_PI;
  if (delta < -Math.PI) delta += TWO_PI;
  return delta;
}

function BombSimple({ modules, startedAt, timerDuration }: Props) {
  const { camera, scene } = useThree();
  const { nodes, materials } = useModuleModel("bomb");
  const setZoomState = useGameStore((s) => s.setZoomState);
  const {
    zoomToModule,
    selectedModuleId,
    reset,
    cameraLocked,
    cameraTargetLookAt,
    cameraTargetPosition,
  } = useGameStore();

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
        if (parent.name === "BombCase") {
          return null;
        }

        if (parent.userData && parent.userData.moduleId) {
          return parent.userData.moduleId as string;
        }
        parent = parent.parent as THREE.Object3D;
      }
    }
    return null;
  }

  useFrame(() => {
    if (cameraLocked && cameraTargetPosition && cameraTargetLookAt) {
      camera.position.lerp(cameraTargetPosition, 0.1);
      camera.lookAt(cameraTargetLookAt);
    }

    const targetY = isPickedUp ? 1 : BOMB_HEIGHT;
    const speed = 0.1;
    setAnimatedHeight((prev) => prev + (targetY - prev) * speed);

    if (!isPickedUp) {
      setRotation((prev) => {
        const targetY = getClosestForwardRotationRadians(prev[1]);

        const rx = prev[0] + (defaultRotation[0] - prev[0]) * speed;
        const ry = prev[1] + shortestAngularDelta(prev[1], targetY) * speed;
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
      // Bomb is already picked up
      // 1) Check if user clicked on a module => rotate bomb forward & zoom in
      if (isBombClicked(event)) {
        if (isPickedUp) {
          reset();
        } else {
          setIsPickedUp(true);
        }
      }

      const modId = isModuleClicked(event);
      if (modId) {
        const module = modules?.[modId];
        if (!isPickedUp) {
          setIsPickedUp(true);
          event.preventDefault();
        }

        const modulePosition = module?.position;
        const { position: baseCoords } = positionToCoords(modulePosition!); // TODO: Handle undefined position / fix type
        const closestRotationY = getClosestForwardRotationRadians(rotation[1]);
        setRotation([defaultRotation[0], closestRotationY, defaultRotation[2]]);

        const cameraTargetPosition = new THREE.Vector3(
          baseCoords.x,
          baseCoords.y + CAMERA_HEIGHT,
          CAMERA_DISTANCE_ZOOMED,
        );

        const lookAt = new THREE.Vector3(
          baseCoords.x,
          cameraTargetPosition.y,
          0,
        );

        zoomToModule(modId, cameraTargetPosition, lookAt);
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
        reset();
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
            rx += dy * rotateSpeed;
            ry += dx * rotateSpeed;
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

  return (
    <group ref={bombRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Case.geometry}
        material={materials.Silver}
        scale={[0.911, 1, 1]}
        onPointerEnter={(e) => e.stopPropagation()}
        name="BombCase"
      >
        <group position={[0, -BOMB_HEIGHT, 0]} scale={[1.098, 1, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.H.geometry}
            material={materials.Silver}
            position={[0, BOMB_HEIGHT, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.H001.geometry}
            material={materials.Silver}
            position={[0, BOMB_HEIGHT, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.H002.geometry}
            material={materials.Silver}
            position={[0.001, BOMB_HEIGHT, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.V.geometry}
            material={materials.Silver}
            position={[0.005, BOMB_HEIGHT, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.V003.geometry}
            material={materials.Silver}
            position={[-0.007, BOMB_HEIGHT, 0]}
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
