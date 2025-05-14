import { MeshPhongMaterial, MeshStandardMaterial } from "three";

export const materials = {
  "Darker Orange": new MeshStandardMaterial({
    color: "#BE5B0F",
    opacity: 1,
    roughness: 0.7,
    metalness: 0,
    toneMapped: false,
  }),
  "Orange PBSR": new MeshStandardMaterial({
    color: "#d06c13",
    opacity: 1,
    roughness: 0.4,
    metalness: 0.0,
    toneMapped: false,
  }),
  Glass: new MeshPhongMaterial({
    color: 0x000000,
    opacity: 0.85,
    transparent: true,
    shininess: 100,
  }),
  Silver: new MeshStandardMaterial({
    color: "#BFB4B0",
    opacity: 1,
    roughness: 0.6,
    metalness: 0.4,
    toneMapped: false,
  }),
};
