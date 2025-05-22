import * as THREE from "three";
export const CustomMaterials = {
  GreenLight: new THREE.MeshStandardMaterial({
    color: 0x00c136,
    emissive: 0x00c136,
    emissiveIntensity: 0.45,
  }),
  RingLight: new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0x000000,
    emissiveIntensity: 0,
  }),
};
