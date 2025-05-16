import { create } from "zustand";
import * as THREE from "three";
import type OGCameraControls from "camera-controls";

type GamePhase = "idle" | "module-view";

interface GameState {
  selectedModuleId?: string;
  zoomState: GamePhase;
  cameraLocked: boolean;
}

interface GameActions {
  setSelectedModule: (_moduleId?: string) => void;
  setZoomState: (_state: GamePhase) => void;
  zoomToModule: (
    moduleId: string,
    position: THREE.Vector3,
    controls: OGCameraControls
  ) => void;
  reset: () => void;
  lockCamera: () => void;
  unlockCamera: () => void;
}

export const useGameStore = create<GameState & GameActions>()((set) => ({
  // State
  selectedModuleId: undefined,
  zoomState: "idle",
  cameraLocked: false,

  // Actions
  setSelectedModule: (module) => set({ selectedModuleId: module }),
  setZoomState: (state) => set({ zoomState: state }),
  zoomToModule: (moduleId, position, controls) => {
    set({
      selectedModuleId: moduleId,
      zoomState: "module-view",
      cameraLocked: true,
    });
    if (controls) {
      controls.setPosition(position.x, position.y, position.z + 0.1);
      controls.setTarget(position.x, position.y, position.z);
    }
  },
  reset: () =>
    set({
      selectedModuleId: undefined,
      zoomState: "idle",
      cameraLocked: false,
    }),
  lockCamera: () => set({ cameraLocked: true }),
  unlockCamera: () => set({ cameraLocked: false }),
}));
