import { createContext, useContext } from "react";
import type { PlayerInput, PlayerInputResult } from "../generated/proto/player";

interface ServerContextType {
  createGameSession: () => Promise<void>;
  exitGameSession: () => Promise<void>;
  sendPlayerInput: (
    input: PlayerInput
  ) => Promise<PlayerInputResult | undefined>;
  getBombs: () => Promise<void>;
}

export const ServerContext = createContext<ServerContextType>(
  {} as ServerContextType
);

export const useServer = () => useContext(ServerContext);
