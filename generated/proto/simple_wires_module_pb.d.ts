import * as jspb from 'google-protobuf'



export class SimpleWiresInput extends jspb.Message {
  getWireIndex(): number;
  setWireIndex(value: number): SimpleWiresInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimpleWiresInput.AsObject;
  static toObject(includeInstance: boolean, msg: SimpleWiresInput): SimpleWiresInput.AsObject;
  static serializeBinaryToWriter(message: SimpleWiresInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimpleWiresInput;
  static deserializeBinaryFromReader(message: SimpleWiresInput, reader: jspb.BinaryReader): SimpleWiresInput;
}

export namespace SimpleWiresInput {
  export type AsObject = {
    wireIndex: number,
  }
}

