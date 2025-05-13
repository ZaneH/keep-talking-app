import * as jspb from 'google-protobuf'

import * as proto_simple_wires_module_pb from '../proto/simple_wires_module_pb'; // proto import: "proto/simple_wires_module.proto"
import * as proto_password_module_pb from '../proto/password_module_pb'; // proto import: "proto/password_module.proto"
import * as proto_big_button_module_pb from '../proto/big_button_module_pb'; // proto import: "proto/big_button_module.proto"
import * as proto_simon_says_module_pb from '../proto/simon_says_module_pb'; // proto import: "proto/simon_says_module.proto"


export class CreateGameRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateGameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateGameRequest): CreateGameRequest.AsObject;
  static serializeBinaryToWriter(message: CreateGameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateGameRequest;
  static deserializeBinaryFromReader(message: CreateGameRequest, reader: jspb.BinaryReader): CreateGameRequest;
}

export namespace CreateGameRequest {
  export type AsObject = {
  }
}

export class CreateGameResponse extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): CreateGameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateGameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateGameResponse): CreateGameResponse.AsObject;
  static serializeBinaryToWriter(message: CreateGameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateGameResponse;
  static deserializeBinaryFromReader(message: CreateGameResponse, reader: jspb.BinaryReader): CreateGameResponse;
}

export namespace CreateGameResponse {
  export type AsObject = {
    sessionId: string,
  }
}

export class PlayerInput extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): PlayerInput;

  getBombId(): string;
  setBombId(value: string): PlayerInput;

  getModuleId(): string;
  setModuleId(value: string): PlayerInput;

  getSimpleWiresInput(): proto_simple_wires_module_pb.SimpleWiresInput | undefined;
  setSimpleWiresInput(value?: proto_simple_wires_module_pb.SimpleWiresInput): PlayerInput;
  hasSimpleWiresInput(): boolean;
  clearSimpleWiresInput(): PlayerInput;

  getPasswordInput(): proto_password_module_pb.PasswordInput | undefined;
  setPasswordInput(value?: proto_password_module_pb.PasswordInput): PlayerInput;
  hasPasswordInput(): boolean;
  clearPasswordInput(): PlayerInput;

  getBigButtonInput(): proto_big_button_module_pb.BigButtonInput | undefined;
  setBigButtonInput(value?: proto_big_button_module_pb.BigButtonInput): PlayerInput;
  hasBigButtonInput(): boolean;
  clearBigButtonInput(): PlayerInput;

  getSimonSaysInput(): proto_simon_says_module_pb.SimonSaysInput | undefined;
  setSimonSaysInput(value?: proto_simon_says_module_pb.SimonSaysInput): PlayerInput;
  hasSimonSaysInput(): boolean;
  clearSimonSaysInput(): PlayerInput;

  getInputCase(): PlayerInput.InputCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerInput.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerInput): PlayerInput.AsObject;
  static serializeBinaryToWriter(message: PlayerInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerInput;
  static deserializeBinaryFromReader(message: PlayerInput, reader: jspb.BinaryReader): PlayerInput;
}

export namespace PlayerInput {
  export type AsObject = {
    sessionId: string,
    bombId: string,
    moduleId: string,
    simpleWiresInput?: proto_simple_wires_module_pb.SimpleWiresInput.AsObject,
    passwordInput?: proto_password_module_pb.PasswordInput.AsObject,
    bigButtonInput?: proto_big_button_module_pb.BigButtonInput.AsObject,
    simonSaysInput?: proto_simon_says_module_pb.SimonSaysInput.AsObject,
  }

  export enum InputCase { 
    INPUT_NOT_SET = 0,
    SIMPLE_WIRES_INPUT = 10,
    PASSWORD_INPUT = 11,
    BIG_BUTTON_INPUT = 12,
    SIMON_SAYS_INPUT = 13,
  }
}

export class PlayerInputResult extends jspb.Message {
  getModuleId(): string;
  setModuleId(value: string): PlayerInputResult;

  getSuccess(): boolean;
  setSuccess(value: boolean): PlayerInputResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerInputResult.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerInputResult): PlayerInputResult.AsObject;
  static serializeBinaryToWriter(message: PlayerInputResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerInputResult;
  static deserializeBinaryFromReader(message: PlayerInputResult, reader: jspb.BinaryReader): PlayerInputResult;
}

export namespace PlayerInputResult {
  export type AsObject = {
    moduleId: string,
    success: boolean,
  }
}

