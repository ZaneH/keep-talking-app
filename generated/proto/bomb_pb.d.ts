import * as jspb from 'google-protobuf'

import * as proto_modules_pb from '../proto/modules_pb'; // proto import: "proto/modules.proto"


export class Bomb extends jspb.Message {
  getId(): string;
  setId(value: string): Bomb;

  getModulesMap(): jspb.Map<string, proto_modules_pb.Module>;
  clearModulesMap(): Bomb;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bomb.AsObject;
  static toObject(includeInstance: boolean, msg: Bomb): Bomb.AsObject;
  static serializeBinaryToWriter(message: Bomb, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bomb;
  static deserializeBinaryFromReader(message: Bomb, reader: jspb.BinaryReader): Bomb;
}

export namespace Bomb {
  export type AsObject = {
    id: string,
    modulesMap: Array<[string, proto_modules_pb.Module.AsObject]>,
  }
}

