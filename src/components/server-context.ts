import { createContext, useContext } from "react";
import type { PlayerInput } from "../generated/proto/player";

interface ServerContextType {
  createGameSession: () => Promise<void>;
  exitGameSession: () => Promise<void>;
  sendPlayerInput: (input: PlayerInput) => Promise<void>;
  getBombs: () => Promise<void>;
}

export const ServerContext = createContext<ServerContextType>(
  {} as ServerContextType
);

export const useServer = () => useContext(ServerContext);
