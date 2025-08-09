/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "./common.pb"
export type NeedyKnobInput = {
}

export type NeedyKnobInputResult = {
  needyKnobState?: NeedyKnobState
}

export type NeedyKnobState = {
  displayedPatternFirstRow?: boolean[]
  displayedPatternSecondRow?: boolean[]
  dialDirection?: CommonCommon.CardinalDirection
  countdownStartedAt?: string
  countdownDuration?: number
}