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
export type LetterChange = {
  letterIndex?: number
  direction?: CommonCommon.IncrementDecrement
}

export type PasswordSubmit = {
}


type BasePasswordInput = {
}

export type PasswordInput = BasePasswordInput
  & OneOf<{ letterChange: LetterChange; submit: PasswordSubmit }>