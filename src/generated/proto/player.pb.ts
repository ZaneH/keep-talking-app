/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as ModulesBig_button_module from "./big_button_module.pb"
import * as ModulesPassword_module from "./password_module.pb"
import * as ModulesSimon_says_module from "./simon_says_module.pb"
import * as ModulesSimple_wires_module from "./simple_wires_module.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type CreateGameRequest = {
}

export type CreateGameResponse = {
  sessionId?: string
}


type BasePlayerInput = {
  sessionId?: string
  bombId?: string
  moduleId?: string
}

export type PlayerInput = BasePlayerInput
  & OneOf<{ simpleWiresInput: ModulesSimple_wires_module.SimpleWiresInput; passwordInput: ModulesPassword_module.PasswordInput; bigButtonInput: ModulesBig_button_module.BigButtonInput; simonSaysInput: ModulesSimon_says_module.SimonSaysInput }>


type BasePlayerInputResult = {
  moduleId?: string
  strike?: boolean
  solved?: boolean
}

export type PlayerInputResult = BasePlayerInputResult
  & OneOf<{ bigButtonInputResult: ModulesBig_button_module.BigButtonInputResult; simonSaysInputResult: ModulesSimon_says_module.SimonSaysInputResult }>