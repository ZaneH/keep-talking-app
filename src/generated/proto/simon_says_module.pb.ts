/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "./common.pb"
export type SimonSaysInput = {
  color?: CommonCommon.Color
}

export type SimonSaysState = {
  currentSequence?: CommonCommon.Color[]
}

export type SimonSaysInputResult = {
  hasFinishedSeq?: boolean
  displaySequence?: CommonCommon.Color[]
}