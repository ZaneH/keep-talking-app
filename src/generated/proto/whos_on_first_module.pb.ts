/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type WhosOnFirstInput = {
  word?: string
}

export type WhosOnFirstInputResult = {
  whosOnFirstState?: WhosOnFirstState
}

export type WhosOnFirstState = {
  screenWord?: string
  buttonWords?: string[]
  stage?: number
}