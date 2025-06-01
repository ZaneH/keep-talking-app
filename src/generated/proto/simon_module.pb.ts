/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "./common.pb"
export type SimonInput = {
  color?: CommonCommon.Color
}

export type SimonInputResult = {
  hasFinishedSeq?: boolean
  displaySequence?: CommonCommon.Color[]
}

export type SimonState = {
  currentSequence?: CommonCommon.Color[]
}