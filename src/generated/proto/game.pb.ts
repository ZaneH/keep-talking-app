/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../fetch.pb"
import * as PlayerPlayer from "./player.pb"
import * as SessionSession from "./session.pb"
export class GameService {
  static CreateGame(req: PlayerPlayer.CreateGameRequest, initReq?: fm.InitReq): Promise<PlayerPlayer.CreateGameResponse> {
    return fm.fetchReq<PlayerPlayer.CreateGameRequest, PlayerPlayer.CreateGameResponse>(`/v1/game/create`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static GetBombs(req: SessionSession.GetBombsRequest, initReq?: fm.InitReq): Promise<SessionSession.GetBombsResponse> {
    return fm.fetchReq<SessionSession.GetBombsRequest, SessionSession.GetBombsResponse>(`/v1/game/bombs?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static SendInput(req: PlayerPlayer.PlayerInput, initReq?: fm.InitReq): Promise<PlayerPlayer.PlayerInputResult> {
    return fm.fetchReq<PlayerPlayer.PlayerInput, PlayerPlayer.PlayerInputResult>(`/v1/game/input`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}