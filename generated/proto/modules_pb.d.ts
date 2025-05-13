import * as jspb from 'google-protobuf'



export class ModulePosition extends jspb.Message {
  getFace(): number;
  setFace(value: number): ModulePosition;

  getRow(): number;
  setRow(value: number): ModulePosition;

  getCol(): number;
  setCol(value: number): ModulePosition;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModulePosition.AsObject;
  static toObject(includeInstance: boolean, msg: ModulePosition): ModulePosition.AsObject;
  static serializeBinaryToWriter(message: ModulePosition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModulePosition;
  static deserializeBinaryFromReader(message: ModulePosition, reader: jspb.BinaryReader): ModulePosition;
}

export namespace ModulePosition {
  export type AsObject = {
    face: number,
    row: number,
    col: number,
  }
}

export class Module extends jspb.Message {
  getId(): string;
  setId(value: string): Module;

  getType(): Module.ModuleType;
  setType(value: Module.ModuleType): Module;

  getSolved(): boolean;
  setSolved(value: boolean): Module;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Module.AsObject;
  static toObject(includeInstance: boolean, msg: Module): Module.AsObject;
  static serializeBinaryToWriter(message: Module, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Module;
  static deserializeBinaryFromReader(message: Module, reader: jspb.BinaryReader): Module;
}

export namespace Module {
  export type AsObject = {
    id: string,
    type: Module.ModuleType,
    solved: boolean,
  }

  export enum ModuleType { 
    UNKNOWN = 0,
    SIMPLE_WIRES = 1,
    PASSWORD = 2,
    BIG_BUTTON = 3,
    SIMON_SAYS = 4,
  }
}

