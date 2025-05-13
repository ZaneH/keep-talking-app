import * as jspb from 'google-protobuf'

import * as proto_common_pb from '../proto/common_pb'; // proto import: "proto/common.proto"


export class SimonSaysInput extends jspb.Message {
  getColor(): proto_common_pb.Color;
  setColor(value: proto_common_pb.Color): SimonSaysInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimonSaysInput.AsObject;
  static toObject(includeInstance: boolean, msg: SimonSaysInput): SimonSaysInput.AsObject;
  static serializeBinaryToWriter(message: SimonSaysInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimonSaysInput;
  static deserializeBinaryFromReader(message: SimonSaysInput, reader: jspb.BinaryReader): SimonSaysInput;
}

export namespace SimonSaysInput {
  export type AsObject = {
    color: proto_common_pb.Color,
  }
}

