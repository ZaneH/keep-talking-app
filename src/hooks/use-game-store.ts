import { create } from "zustand";
import type { Bomb } from "../generated/proto/bomb.pb";

type GamePhase = "idle" | "module-view";

interface GameState {
  selectedModuleId?: string;
  zoomState: GamePhase;
  cameraLocked: boolean;
  sessionId?: string;
  bombs: Bomb[];
  selectedBombId?: string;
}

interface GameActions {
  setZoomState: (_state: GamePhase) => void;
  setSessionId: (_sessionId?: string) => void;
  setBombs: (_bombs: Bomb[]) => void;
  setSelectedBombId: (_bombId?: string) => void;
  zoomToModule: (_moduleId: string) => void;
  reset: () => void;
}

const CAMERA_ZOOM_OFFSET = 0.28;

export const useGameStore = create<GameState & GameActions>()((set) => ({
  // State
  selectedModuleId: undefined,
  zoomState: "idle",
  cameraLocked: false,
  sessionId: undefined,
  bombs: [],
  selectedBombId: undefined,

  // Actions
  setZoomState: (state) => set({ zoomState: state }),
  setSessionId: (sessionId) => set({ sessionId }),
  setBombs: (bombs) => set({ bombs }),
  setSelectedBombId: (bombId) => set({ selectedBombId: bombId }),
  zoomToModule: (moduleId) => {
    set({
      selectedModuleId: moduleId,
      zoomState: "module-view",
      cameraLocked: true,
    });

    // With our new approach, we don't need to move the camera
    // The bomb rotation takes care of showing the module
  },
  reset: () => {
    set({
      selectedModuleId: undefined,
      zoomState: "idle",
      cameraLocked: false,
    });
    // No camera position reset needed
  },
}));
