import * as jspb from 'google-protobuf'

import * as proto_common_pb from '../proto/common_pb'; // proto import: "proto/common.proto"


export class BigButtonInput extends jspb.Message {
  getPressType(): proto_common_pb.PressType;
  setPressType(value: proto_common_pb.PressType): BigButtonInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BigButtonInput.AsObject;
  static toObject(includeInstance: boolean, msg: BigButtonInput): BigButtonInput.AsObject;
  static serializeBinaryToWriter(message: BigButtonInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BigButtonInput;
  static deserializeBinaryFromReader(message: BigButtonInput, reader: jspb.BinaryReader): BigButtonInput;
}

export namespace BigButtonInput {
  export type AsObject = {
    pressType: proto_common_pb.PressType,
  }
}

