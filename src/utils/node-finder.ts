import * as THREE from "three";

export function getModuleRoot(object: THREE.Object3D): THREE.Object3D {
  let current = object;
  while (current.parent) {
    if (current.userData?.moduleId || current.name === "module") {
      return current;
    }
    current = current.parent;
  }
  return object;
}

export function getNamedRoot(
  object: THREE.Object3D,
  name: string,
): THREE.Object3D | null {
  let current = object;
  while (current.parent) {
    if (current.name === name) {
      return current;
    }
    current = current.parent;
  }
  return null;
}
