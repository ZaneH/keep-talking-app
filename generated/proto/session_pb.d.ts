import * as jspb from 'google-protobuf'

import * as proto_bomb_pb from '../proto/bomb_pb'; // proto import: "proto/bomb.proto"


export class GetBombsRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): GetBombsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBombsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBombsRequest): GetBombsRequest.AsObject;
  static serializeBinaryToWriter(message: GetBombsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBombsRequest;
  static deserializeBinaryFromReader(message: GetBombsRequest, reader: jspb.BinaryReader): GetBombsRequest;
}

export namespace GetBombsRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class GetBombsResponse extends jspb.Message {
  getBombsList(): Array<proto_bomb_pb.Bomb>;
  setBombsList(value: Array<proto_bomb_pb.Bomb>): GetBombsResponse;
  clearBombsList(): GetBombsResponse;
  addBombs(value?: proto_bomb_pb.Bomb, index?: number): proto_bomb_pb.Bomb;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBombsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBombsResponse): GetBombsResponse.AsObject;
  static serializeBinaryToWriter(message: GetBombsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBombsResponse;
  static deserializeBinaryFromReader(message: GetBombsResponse, reader: jspb.BinaryReader): GetBombsResponse;
}

export namespace GetBombsResponse {
  export type AsObject = {
    bombsList: Array<proto_bomb_pb.Bomb.AsObject>,
  }
}

