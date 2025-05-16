import { useGLTF } from "@react-three/drei";

const ModuleModels = {
  bomb: "/bomb.glb",
  clock: "/clock-module.glb",
  bigButton: "/big-button-module.glb",
  simpleWires: "/simple-wires.glb",
};

export const preloadModels = () => {
  Object.values(ModuleModels).forEach((path) => useGLTF.preload(path));
};

export const useModuleModel = (modelKey: keyof typeof ModuleModels) => {
  return useGLTF(ModuleModels[modelKey]) as any;
};
