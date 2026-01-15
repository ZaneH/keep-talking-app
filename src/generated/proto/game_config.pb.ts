/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as ModulesModules from "./modules.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum Mission {
  MISSION_UNSPECIFIED = "MISSION_UNSPECIFIED",
  THE_FIRST_BOMB = "THE_FIRST_BOMB",
  SOMETHING_OLD_SOMETHING_NEW = "SOMETHING_OLD_SOMETHING_NEW",
  DOUBLE_YOUR_MONEY = "DOUBLE_YOUR_MONEY",
  ONE_STEP_UP = "ONE_STEP_UP",
  PICK_UP_THE_PACE = "PICK_UP_THE_PACE",
  A_HIDDEN_MESSAGE = "A_HIDDEN_MESSAGE",
  SOMETHINGS_DIFFERENT = "SOMETHINGS_DIFFERENT",
  ONE_GIANT_LEAP = "ONE_GIANT_LEAP",
  FAIR_GAME = "FAIR_GAME",
  PICK_UP_THE_PACE_II = "PICK_UP_THE_PACE_II",
  NO_ROOM_FOR_ERROR = "NO_ROOM_FOR_ERROR",
  EIGHT_MINUTES = "EIGHT_MINUTES",
  A_SMALL_WRINKLE = "A_SMALL_WRINKLE",
  PAY_ATTENTION = "PAY_ATTENTION",
  THE_KNOB = "THE_KNOB",
  MULTI_TASKER = "MULTI_TASKER",
  WIRES_WIRES_EVERYWHERE = "WIRES_WIRES_EVERYWHERE",
  COMPUTER_HACKING = "COMPUTER_HACKING",
  WHOS_ON_FIRST_CHALLENGE = "WHOS_ON_FIRST_CHALLENGE",
  FIENDISH = "FIENDISH",
  PICK_UP_THE_PACE_III = "PICK_UP_THE_PACE_III",
  ONE_WITH_EVERYTHING = "ONE_WITH_EVERYTHING",
  PICK_UP_THE_PACE_IV = "PICK_UP_THE_PACE_IV",
  JUGGLER = "JUGGLER",
  DOUBLE_TROUBLE = "DOUBLE_TROUBLE",
  I_AM_HARDCORE = "I_AM_HARDCORE",
  BLINKENLIGHTS = "BLINKENLIGHTS",
  APPLIED_THEORY = "APPLIED_THEORY",
  A_MAZE_ING = "A_MAZE_ING",
  SNIP_SNAP = "SNIP_SNAP",
  RAINBOW_TABLE = "RAINBOW_TABLE",
  BLINKENLIGHTS_II = "BLINKENLIGHTS_II",
}

export type LevelConfig = {
  level?: number
}

export type PresetMissionConfig = {
  mission?: Mission
}

export type ModuleSpec = {
  type?: ModulesModules.ModuleModuleType
  possibleTypes?: ModulesModules.ModuleModuleType[]
  count?: number
}

export type CustomBombConfig = {
  timerSeconds?: number
  maxStrikes?: number
  numFaces?: number
  rows?: number
  columns?: number
  modules?: ModuleSpec[]
  minModules?: number
  maxModulesPerFace?: number
  minBatteries?: number
  maxBatteries?: number
  maxIndicatorCount?: number
  portCount?: number
}


type BaseGameConfig = {
  seed?: string
}

export type GameConfig = BaseGameConfig
  & OneOf<{ level: LevelConfig; preset: PresetMissionConfig; custom: CustomBombConfig }>

export type GeneratedConfigInfo = {
  timerSeconds?: number
  maxStrikes?: number
  numFaces?: number
  totalModules?: number
  moduleTypes?: ModulesModules.ModuleModuleType[]
}