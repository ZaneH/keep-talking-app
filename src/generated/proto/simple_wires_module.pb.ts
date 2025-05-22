/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "./common.pb"
export type SimpleWiresInput = {
  wireIndex?: number
}

export type SimpleWiresState = {
  wires?: Wire[]
}

export type Wire = {
  wireColor?: CommonCommon.Color
  isCut?: boolean
  index?: number
}