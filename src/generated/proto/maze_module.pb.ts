/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "./common.pb"
export type MazeInput = {
  direction?: CommonCommon.CardinalDirection
}

export type MazeInputResult = {
  mazeState?: MazeState
}

export type MazeState = {
  maze?: Maze
  playerPosition?: CommonCommon.Point2D
}

export type Maze = {
  marker1?: CommonCommon.Point2D
  marker2?: CommonCommon.Point2D
}