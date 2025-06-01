/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum Symbol {
  COPYRIGHT = "COPYRIGHT",
  FILLED_STAR = "FILLED_STAR",
  HOLLOW_STAR = "HOLLOW_STAR",
  SMILEY_FACE = "SMILEY_FACE",
  DOUBLE_K = "DOUBLE_K",
  OMEGA = "OMEGA",
  SQUID_KNIFE = "SQUID_KNIFE",
  PUMPKIN = "PUMPKIN",
  HOOK_N = "HOOK_N",
  SIX = "SIX",
  SQUIGGLY_N = "SQUIGGLY_N",
  AT = "AT",
  AE = "AE",
  MELTED_THREE = "MELTED_THREE",
  EURO = "EURO",
  N_WITH_HAT = "N_WITH_HAT",
  DRAGON = "DRAGON",
  QUESTION_MARK = "QUESTION_MARK",
  PARAGRAPH = "PARAGRAPH",
  RIGHT_C = "RIGHT_C",
  LEFT_C = "LEFT_C",
  PITCHFORK = "PITCHFORK",
  CURSIVE = "CURSIVE",
  TRACKS = "TRACKS",
  BALLOON = "BALLOON",
  UPSIDE_DOWN_Y = "UPSIDE_DOWN_Y",
  BT = "BT",
}

export type KeypadInput = {
  symbol?: Symbol
}

export type KeypadInputResult = {
  keypadState?: KeypadState
}

export type KeypadState = {
  displayedSymbols?: Symbol[]
  activatedSymbols?: Symbol[]
}