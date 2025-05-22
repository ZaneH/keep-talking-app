import type OGCameraControls from "camera-controls";
import * as THREE from "three";
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
  zoomToModule: (
    _moduleId: string,
    _position: THREE.Vector3,
    _controls: OGCameraControls
  ) => void;
  reset: (_controls: OGCameraControls | null) => void;
}

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
}));
