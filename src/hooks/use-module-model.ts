import { useGLTF } from "@react-three/drei";

export const ModuleModels = {
  bomb: "/bomb.glb",
  clock: "/clock.glb",
  "big-button": "/big-button.glb",
  "simple-wires": "/simple-wires.glb",
  table: "/table-room.glb",
  keypad: "/keypad.glb",
  "simon-says": "/simon-says.glb",
  password: "/password.glb",
  "whos-on-first": "/whos-on-first.glb",
  memory: "/memory.glb",
  morse: "/morse.glb",
  "needy-vent-gas": "/needy-vent-gas.glb",
  "needy-knob": "/needy-knob.glb",
  maze: "./maze.glb",
};

export const preloadModels = () => {
  Object.values(ModuleModels).forEach((path) => useGLTF.preload(path));
};

export const useModuleModel = (modelKey: keyof typeof ModuleModels) => {
  return useGLTF(ModuleModels[modelKey]) as any;
};
