import { convertUint8ArrayToImageURL } from '@/lib/utils';

export type RawPostEntity = {
  postId: BigInt;
  postBody: string;
  postImage: Uint8Array | number[] | undefined;
  internetIdentity: string;
  numUpVotes: BigInt;
  numDownVotes: BigInt;
  numComments: BigInt;
};

export type PostEntity = {
  postId: string;
  postBody: string;
  postImageUrl: string;
  internetIdentity: string;
  numUpVotes: BigInt;
  numDownVotes: BigInt;
  numComments: BigInt;
};

export function convertRawPostEntityToPostEntity(
  raw: RawPostEntity,
): PostEntity {
  return {
    postId: raw.postId.toString(),
    postBody: raw.postBody,
    postImageUrl: convertUint8ArrayToImageURL(raw.postImage ?? new Uint8Array()),
    internetIdentity: raw.internetIdentity.toString(),
    numUpVotes: raw.numUpVotes,
    numDownVotes: raw.numDownVotes,
    numComments: raw.numComments,
  };
}
