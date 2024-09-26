import { convertUint8ArrayToImageURL } from '@/lib/utils';
import { Principal } from '@ic-reactor/react/dist/types';

export type RawPostEntity = {
  postId: BigInt;
  postTitle: string;
  postBody: string;
  postImage: [] | [Uint8Array | number[]];
  internetIdentity: Principal;
  numUpVotes: BigInt;
  numDownVotes: BigInt;
  numComments: BigInt;
};

export type PostEntity = {
  postId: string;
  postTitle: string;
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
    postTitle: raw.postTitle,
    postBody: raw.postBody,
    postImageUrl: convertUint8ArrayToImageURL(
      raw.postImage[0] ?? new Uint8Array(),
    ),
    internetIdentity: raw.internetIdentity.toString(),
    numUpVotes: raw.numUpVotes,
    numDownVotes: raw.numDownVotes,
    numComments: raw.numComments,
  };
}

export function convertAllRawPostEntityToPostEntity(raws: RawPostEntity[]): PostEntity[] {
  const converted: PostEntity[] = raws.map((raw) => {
    return convertRawPostEntityToPostEntity(raw);
  });

  return converted;
}

export const dummyPosts: PostEntity[] = [
  {
    postId: '123',
    postTitle: 'The Future of AI',
    postBody:
      'Artificial intelligence (AI) is transforming the way we interact with technology...',
    postImageUrl: 'https://example.com/image.jpg',
    internetIdentity: 'abc-xyz-123',
    numUpVotes: BigInt(120),
    numDownVotes: BigInt(5),
    numComments: BigInt(30),
  },
  {
    postId: '345',
    postTitle: 'Suer coyy ??',
    postBody:
      'Exploring the nuances of language and its quirky usage in modern communication...',
    postImageUrl: 'https://example.com/image1.jpg',
    internetIdentity: 'def-uvw-456',
    numUpVotes: BigInt(85),
    numDownVotes: BigInt(3),
    numComments: BigInt(12),
  },
  {
    postId: '346',
    postTitle: 'Latest Tech Trends',
    postBody: 'A deep dive into the latest trends in technology...',
    postImageUrl: 'https://example.com/image2.jpg',
    internetIdentity: 'ghi-xyz-789',
    numUpVotes: BigInt(150),
    numDownVotes: BigInt(8),
    numComments: BigInt(20),
  },
  {
    postId: '347',
    postTitle: 'Creative Design Tips',
    postBody: 'Top design tips for professionals in 2024...',
    postImageUrl: 'https://example.com/image3.jpg',
    internetIdentity: 'jkl-opq-321',
    numUpVotes: BigInt(60),
    numDownVotes: BigInt(2),
    numComments: BigInt(10),
  },
];
