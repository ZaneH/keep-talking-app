/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "./common.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type MorseFrequencyChange = {
  direction?: CommonCommon.IncrementDecrement
}

export type MorseTx = {
}


type BaseMorseInput = {
}

export type MorseInput = BaseMorseInput
  & OneOf<{ frequencyChange: MorseFrequencyChange; tx: MorseTx }>

export type MorseInputResult = {
  morseState?: MorseState
}

export type MorseState = {
  displayedPattern?: string
  displayedFrequency?: number
  selectedFrequencyIndex?: number
}