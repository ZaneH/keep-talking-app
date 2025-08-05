import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../hooks/use-game-store";
import { CAMERA_DISTANCE, CAMERA_HEIGHT } from "../utils/constants";

const defaultCameraPosition = new THREE.Vector3(
  0,
  CAMERA_HEIGHT,
  CAMERA_DISTANCE,
);
const defaultCameraLookAt = new THREE.Vector3(0, 0, 0);

export function useCameraControl(
  cameraRef: RefObject<THREE.PerspectiveCamera>,
) {
  const { cameraTargetPosition, cameraTargetLookAt } = useGameStore();

  const currentCameraPosition = useRef(defaultCameraPosition.clone());
  const currentCameraLookAt = useRef(defaultCameraLookAt.clone());

  useFrame(() => {
    if (!cameraRef.current) return;

    const targetPos = cameraTargetPosition || defaultCameraPosition;
    const targetLookAt = cameraTargetLookAt || defaultCameraLookAt;

    currentCameraPosition.current.x = THREE.MathUtils.damp(
      currentCameraPosition.current.x,
      targetPos.x,
      4,
      0.016,
    );
    currentCameraPosition.current.y = THREE.MathUtils.damp(
      currentCameraPosition.current.y,
      targetPos.y,
      4,
      0.016,
    );
    currentCameraPosition.current.z = THREE.MathUtils.damp(
      currentCameraPosition.current.z,
      targetPos.z,
      4,
      0.016,
    );

    currentCameraLookAt.current.x = THREE.MathUtils.damp(
      currentCameraLookAt.current.x,
      targetLookAt.x,
      4,
      0.016,
    );
    currentCameraLookAt.current.y = THREE.MathUtils.damp(
      currentCameraLookAt.current.y,
      targetLookAt.y,
      4,
      0.016,
    );
    currentCameraLookAt.current.z = THREE.MathUtils.damp(
      currentCameraLookAt.current.z,
      targetLookAt.z,
      4,
      0.016,
    );

    cameraRef.current.position.copy(currentCameraPosition.current);
    cameraRef.current.lookAt(currentCameraLookAt.current);
  });
}
