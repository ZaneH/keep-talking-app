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
  & OneOf<{ wiresInput: ModulesWires_module.WiresInput; passwordInput: ModulesPassword_module.PasswordInput; bigButtonInput: ModulesBig_button_module.BigButtonInput; simonInput: ModulesSimon_module.SimonInput; keypadInput: ModulesKeypad_module.KeypadInput; whosOnFirstInput: ModulesWhos_on_first_module.WhosOnFirstInput; memoryInput: ModulesMemory_module.MemoryInput; morseInput: ModulesMorse_module.MorseInput; needyVentGasInput: ModulesNeedy_vent_gas_module.NeedyVentGasInput; needyKnobInput: ModulesNeedy_knob_module.NeedyKnobInput }>


type BasePlayerInputResult = {
  moduleId?: string
  strike?: boolean
  solved?: boolean
}

export type PlayerInputResult = BasePlayerInputResult
  & OneOf<{ bigButtonInputResult: ModulesBig_button_module.BigButtonInputResult; simonInputResult: ModulesSimon_module.SimonInputResult; passwordInputResult: ModulesPassword_module.PasswordInputResult; keypadInputResult: ModulesKeypad_module.KeypadInputResult; whosOnFirstInputResult: ModulesWhos_on_first_module.WhosOnFirstInputResult; memoryInputResult: ModulesMemory_module.MemoryInputResult; morseInputResult: ModulesMorse_module.MorseInputResult; needyVentGasInputResult: ModulesNeedy_vent_gas_module.NeedyVentGasInputResult; needyKnobInputResult: ModulesNeedy_knob_module.NeedyKnobInputResult }>