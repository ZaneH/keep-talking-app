import * as jspb from 'google-protobuf'

import * as proto_common_pb from '../proto/common_pb'; // proto import: "proto/common.proto"


export class LetterChange extends jspb.Message {
  getLetterIndex(): number;
  setLetterIndex(value: number): LetterChange;

  getDirection(): proto_common_pb.IncrementDecrement;
  setDirection(value: proto_common_pb.IncrementDecrement): LetterChange;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LetterChange.AsObject;
  static toObject(includeInstance: boolean, msg: LetterChange): LetterChange.AsObject;
  static serializeBinaryToWriter(message: LetterChange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LetterChange;
  static deserializeBinaryFromReader(message: LetterChange, reader: jspb.BinaryReader): LetterChange;
}

export namespace LetterChange {
  export type AsObject = {
    letterIndex: number,
    direction: proto_common_pb.IncrementDecrement,
  }
}

export class PasswordSubmit extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordSubmit.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordSubmit): PasswordSubmit.AsObject;
  static serializeBinaryToWriter(message: PasswordSubmit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordSubmit;
  static deserializeBinaryFromReader(message: PasswordSubmit, reader: jspb.BinaryReader): PasswordSubmit;
}

export namespace PasswordSubmit {
  export type AsObject = {
  }
}

export class PasswordInput extends jspb.Message {
  getLetterChange(): LetterChange | undefined;
  setLetterChange(value?: LetterChange): PasswordInput;
  hasLetterChange(): boolean;
  clearLetterChange(): PasswordInput;

  getSubmit(): PasswordSubmit | undefined;
  setSubmit(value?: PasswordSubmit): PasswordInput;
  hasSubmit(): boolean;
  clearSubmit(): PasswordInput;

  getInputCase(): PasswordInput.InputCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordInput.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordInput): PasswordInput.AsObject;
  static serializeBinaryToWriter(message: PasswordInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordInput;
  static deserializeBinaryFromReader(message: PasswordInput, reader: jspb.BinaryReader): PasswordInput;
}

export namespace PasswordInput {
  export type AsObject = {
    letterChange?: LetterChange.AsObject,
    submit?: PasswordSubmit.AsObject,
  }

  export enum InputCase { 
    INPUT_NOT_SET = 0,
    LETTER_CHANGE = 1,
    SUBMIT = 2,
  }
}

