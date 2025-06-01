/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "./common.pb"
export type WiresInput = {
  wirePosition?: number
}

export type WiresState = {
  wires?: Wire[]
}

export type Wire = {
  wireColor?: CommonCommon.Color
  isCut?: boolean
  position?: number
}