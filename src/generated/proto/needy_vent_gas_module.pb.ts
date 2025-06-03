/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type NeedyVentGasInput = {
  input?: boolean
}

export type NeedyVentGasInputResult = {
  needyVentGasState?: NeedyVentGasState
}

export type NeedyVentGasState = {
  displayedQuestion?: string
  countdownStartedAt?: string
  countdownDuration?: number
}