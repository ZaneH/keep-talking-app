import { createContext, useContext } from "react";
import type { Indicator, Port } from "../generated/proto/bomb.pb";
import type { Module } from "../generated/proto/modules.pb";

type BombContextType = {
  bombId?: string;
  modules?: { [key: string]: Module };
  startedAt?: number;
  timerDuration?: number;
  batteries?: number;
  serialNumber?: string;
  strikeCount?: number;
  maxStrikes?: number;
  ports?: Port[];
  indicators?: { [key: string]: Indicator };
};

export const BombContext = createContext<BombContextType | null>(null);

export function useBomb() {
  const context = useContext(BombContext);
  if (!context) {
    throw new Error("useBomb must be used within a BombProvider");
  }

  return context;
}
