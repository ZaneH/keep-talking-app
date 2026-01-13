import { create } from "zustand";
import * as THREE from "three";
import type { Bomb } from "../generated/proto/bomb.pb";

type GamePhase = "idle" | "module-view";

interface GameState {
  selectedModuleId?: string;
  zoomState: GamePhase;
  cameraLocked: boolean;
  sessionId?: string;
  bombs: Bomb[];
  selectedBombId?: string;
  cameraTargetPosition?: THREE.Vector3;
  cameraTargetLookAt?: THREE.Vector3;
}

interface GameActions {
  setZoomState: (_state: GamePhase) => void;
  setSessionId: (_sessionId?: string) => void;
  setBombs: (_bombs: Bomb[]) => void;
  setSelectedBombId: (_bombId?: string) => void;
  updateBombFromStatus: (_bombId: string, _strikeCount: number) => void;
  zoomToModule: (
    _moduleId: string,
    _position: THREE.Vector3,
    _lookAt: THREE.Vector3,
  ) => void;
  reset: () => void;
}

export const useGameStore = create<GameState & GameActions>()((set) => ({
  // State
  selectedModuleId: undefined,
  zoomState: "idle",
  cameraLocked: false,
  sessionId: undefined,
  bombs: [],
  selectedBombId: undefined,
  cameraTargetPosition: undefined,
  cameraTargetLookAt: undefined,

  // Actions
  setZoomState: (state) => set({ zoomState: state }),
  setSessionId: (sessionId) => set({ sessionId }),
  setBombs: (bombs) => set({ bombs }),
  setSelectedBombId: (bombId) => set({ selectedBombId: bombId }),
  updateBombFromStatus: (bombId, strikeCount) =>
    set((state) => {
      const updatedBombs = state.bombs.map((bomb) =>
        bomb.id === bombId ? { ...bomb, strikeCount } : bomb,
      );
      return { bombs: updatedBombs };
    }),
  zoomToModule: (moduleId, position, lookAt) => {
    console.log("zoomToModule called:", { moduleId, position, lookAt });
    set({
      selectedModuleId: moduleId,
      zoomState: "module-view",
      cameraLocked: true,
      cameraTargetPosition: position,
      cameraTargetLookAt: lookAt,
    });
  },
  reset: () => {
    console.log("Game store reset called");
    set({
      selectedModuleId: undefined,
      zoomState: "idle",
      cameraLocked: false,
      cameraTargetPosition: undefined,
      cameraTargetLookAt: undefined,
    });
  },
}));
