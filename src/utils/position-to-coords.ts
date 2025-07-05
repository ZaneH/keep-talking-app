import * as THREE from "three";
import type { ModulePosition } from "../generated/proto/modules.pb";

export function positionToCoords(position: ModulePosition): {
  position: THREE.Vector3;
  rotation: THREE.Euler;
} {
  const { col = 0, row = 0, face = 0 } = position;
  const xFactor = 0.195;
  const yFactor = 0.198;

  const xOffset = -xFactor;
  const yOffset = 0.1;
  const zOffset = 0.1;

  const rotationY = face === 1 ? Math.PI : 0;

  return {
    position: new THREE.Vector3(
      xOffset + xFactor * col,
      yOffset - yFactor * row,
      face === 0 ? zOffset : -zOffset,
    ),
    rotation: new THREE.Euler(0, rotationY, 0),
  };
}
