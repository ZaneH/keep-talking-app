/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum Symbol {
  COPYRIGHT = "COPYRIGHT",
  FILLEDSTAR = "FILLEDSTAR",
  HOLLOWSTAR = "HOLLOWSTAR",
  SMILEYFACE = "SMILEYFACE",
  DOUBLEK = "DOUBLEK",
  OMEGA = "OMEGA",
  SQUIDKNIFE = "SQUIDKNIFE",
  PUMPKIN = "PUMPKIN",
  HOOKN = "HOOKN",
  SIX = "SIX",
  SQUIGGLYN = "SQUIGGLYN",
  AT = "AT",
  AE = "AE",
  MELTEDTHREE = "MELTEDTHREE",
  EURO = "EURO",
  NWITHHAT = "NWITHHAT",
  DRAGON = "DRAGON",
  QUESTIONMARK = "QUESTIONMARK",
  PARAGRAPH = "PARAGRAPH",
  RIGHTC = "RIGHTC",
  LEFTC = "LEFTC",
  PITCHFORK = "PITCHFORK",
  CURSIVE = "CURSIVE",
  TRACKS = "TRACKS",
  BALLOON = "BALLOON",
  UPSIDEDOWNY = "UPSIDEDOWNY",
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