/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type MemoryInput = {
  buttonIndex?: number
}

export type MemoryInputResult = {
  memoryState?: MemoryState
}

export type MemoryState = {
  screenNumber?: number
  displayedNumbers?: number[]
  stage?: number
}