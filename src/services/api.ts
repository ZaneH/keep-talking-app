import type { InitReq } from "../generated/fetch.pb";
import { GameService as OriginalGameService } from "../generated/proto/game.pb";
import * as PlayerPlayer from "../generated/proto/player.pb";
import * as SessionSession from "../generated/proto/session.pb";

const defaultConfig: InitReq = {
  pathPrefix: import.meta.env.VITE_BOMB_API_URL,
};

export class GameService {
  static CreateGame(
    req: PlayerPlayer.CreateGameRequest,
    initReq?: InitReq
  ): Promise<PlayerPlayer.CreateGameResponse> {
    return OriginalGameService.CreateGame(req, {
      ...defaultConfig,
      ...initReq,
    });
  }

  static GetBombs(
    req: SessionSession.GetBombsRequest,
    initReq?: InitReq
  ): Promise<SessionSession.GetBombsResponse> {
    return OriginalGameService.GetBombs(req, { ...defaultConfig, ...initReq });
  }

  static SendInput(
    req: PlayerPlayer.PlayerInput,
    initReq?: InitReq
  ): Promise<PlayerPlayer.PlayerInputResult> {
    return OriginalGameService.SendInput(req, { ...defaultConfig, ...initReq });
  }
}
