import type OGCameraControls from "camera-controls";
import * as THREE from "three";
import { create } from "zustand";

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
    _moduleId: string,
    _position: THREE.Vector3,
    _controls: OGCameraControls
  ) => void;
  reset: (controls: OGCameraControls | null) => void;
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
      controls.setPosition(position.x, position.y, position.z + 0.1, true);
      controls.setTarget(position.x, position.y, position.z, true);
    }
  },
  reset: (controls) => {
    set({
      selectedModuleId: undefined,
      zoomState: "idle",
      cameraLocked: false,
    });
    if (controls) {
      controls.setPosition(0, 0, 1.5, true);
      controls.setTarget(0, 0, 0, true);
    }
  },
  lockCamera: () => set({ cameraLocked: true }),
  unlockCamera: () => set({ cameraLocked: false }),
}));
