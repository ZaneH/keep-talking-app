import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { useCallback, useEffect } from "react";
import { GameServiceClient } from "../generated/proto/game.client";
import type { PlayerInput } from "../generated/proto/player";
import { useGameStore } from "../hooks/use-game-store";
import { ServerContext } from "./server-context";

export function ServerProvider({ children }: { children: React.ReactNode }) {
  const transport = new GrpcWebFetchTransport({
    baseUrl: "http://localhost:8080",
  });
  const gameService = new GameServiceClient(transport);
  const { sessionId, setSessionId, setSelectedBombId, setBombs } =
    useGameStore();

  const createGameSession = useCallback(async () => {
    if (sessionId) return;

    const response = await gameService.createGame({});
    if (response.response.sessionId) {
      setSessionId(response.response.sessionId);
      console.log("Set sessionId", response.response.sessionId);

      await getBombs();
    }
  }, [sessionId]);

  const exitGameSession = useCallback(async () => {
    console.error("Not implemented yet");
    // if (!sessionId) return;
    // await gameService.exitGame({ sessionId });
  }, [sessionId]);

  const getBombs = useCallback(async () => {
    if (!sessionId) return;
    const response = await gameService.getBombs({ sessionId });
    setBombs(response.response.bombs);
    setSelectedBombId(response.response.bombs[0]?.id); // TODO: Adapt for multiple bombs

    console.log("Set bombs", response.response.bombs);
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      getBombs();
    }
  }, [sessionId]);

  const sendPlayerInput = useCallback(
    async (input: PlayerInput) => {
      if (!sessionId) return;
      const response = await gameService.sendInput(input);

      return response.response;
    },
    [sessionId]
  );

  return (
    <ServerContext.Provider
      value={{
        createGameSession,
        exitGameSession,
        sendPlayerInput,
        getBombs,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}
