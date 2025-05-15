import { create } from "zustand";

type GamePhase = "idle" | "module-view";

interface GameStore {
  selectedModuleUUID?: string;
  zoomState: GamePhase;
  setSelectedModule: (_module?: string) => void;
  setZoomState: (_state: GamePhase) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>()((set) => ({
  selectedModuleUUID: undefined,
  zoomState: "idle",
  setSelectedModule: (module) => set({ selectedModuleUUID: module }),
  setZoomState: (state) => set({ zoomState: state }),
  reset: () => set({ selectedModuleUUID: undefined, zoomState: "idle" }),
}));
