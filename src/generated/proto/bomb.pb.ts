/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as ModulesModules from "./modules.pb"

export enum Port {
  DVID = "DVID",
  RCA = "RCA",
  PS2 = "PS2",
  RJ45 = "RJ45",
  SERIAL = "SERIAL",
}

export type Bomb = {
  id?: string
  serialNumber?: string
  timerDuration?: number
  startedAt?: number
  strikeCount?: number
  maxStrikes?: number
  modules?: {[key: string]: ModulesModules.Module}
  indicators?: {[key: string]: Indicator}
  batteries?: number
  ports?: Port[]
}

export type Indicator = {
  label?: string
  lit?: boolean
}