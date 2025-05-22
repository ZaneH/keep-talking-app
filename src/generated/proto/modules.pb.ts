/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as ModulesBig_button_module from "./big_button_module.pb"
import * as ModulesSimple_wires_module from "./simple_wires_module.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum ModuleModuleType {
  UNKNOWN = "UNKNOWN",
  SIMPLE_WIRES = "SIMPLE_WIRES",
  PASSWORD = "PASSWORD",
  BIG_BUTTON = "BIG_BUTTON",
  SIMON_SAYS = "SIMON_SAYS",
}

export type ModulePosition = {
  face?: number
  row?: number
  col?: number
}


type BaseModule = {
  id?: string
  type?: ModuleModuleType
  position?: ModulePosition
  solved?: boolean
}

export type Module = BaseModule
  & OneOf<{ simpleWires: ModulesSimple_wires_module.SimpleWiresState; bigButton: ModulesBig_button_module.BigButtonState }>