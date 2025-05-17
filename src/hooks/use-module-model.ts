import { useGLTF } from "@react-three/drei";

const ModuleModels = {
  bomb: "/bomb.glb",
  clock: "/clock.glb",
  bigButton: "/big-button.glb",
  simpleWires: "/simple-wires.glb",
  table: "/table-room.glb",
};

export const preloadModels = () => {
  Object.values(ModuleModels).forEach((path) => useGLTF.preload(path));
};

export const useModuleModel = (modelKey: keyof typeof ModuleModels) => {
  return useGLTF(ModuleModels[modelKey]) as any;
};
