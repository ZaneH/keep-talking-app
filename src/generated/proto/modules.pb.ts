/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as ModulesBig_button_module from "./big_button_module.pb"
import * as ModulesKeypad_module from "./keypad_module.pb"
import * as ModulesMemory_module from "./memory_module.pb"
import * as ModulesMorse_module from "./morse_module.pb"
import * as ModulesNeedy_knob_module from "./needy_knob_module.pb"
import * as ModulesNeedy_vent_gas_module from "./needy_vent_gas_module.pb"
import * as ModulesPassword_module from "./password_module.pb"
import * as ModulesSimon_module from "./simon_module.pb"
import * as ModulesWhos_on_first_module from "./whos_on_first_module.pb"
import * as ModulesWires_module from "./wires_module.pb"

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
  CLOCK = "CLOCK",
  WIRES = "WIRES",
  PASSWORD = "PASSWORD",
  BIG_BUTTON = "BIG_BUTTON",
  SIMON = "SIMON",
  KEYPAD = "KEYPAD",
  WHOS_ON_FIRST = "WHOS_ON_FIRST",
  MEMORY = "MEMORY",
  MORSE = "MORSE",
  NEEDY_VENT_GAS = "NEEDY_VENT_GAS",
  NEEDY_KNOB = "NEEDY_KNOB",
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
  & OneOf<{ wiresState: ModulesWires_module.WiresState; passwordState: ModulesPassword_module.PasswordState; bigButtonState: ModulesBig_button_module.BigButtonState; simonState: ModulesSimon_module.SimonState; keypadState: ModulesKeypad_module.KeypadState; whosOnFirstState: ModulesWhos_on_first_module.WhosOnFirstState; memoryState: ModulesMemory_module.MemoryState; morseState: ModulesMorse_module.MorseState; needyVentGasState: ModulesNeedy_vent_gas_module.NeedyVentGasState; needyKnobState: ModulesNeedy_knob_module.NeedyKnobState }>