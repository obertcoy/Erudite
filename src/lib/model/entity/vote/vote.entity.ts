import { Principal } from '@ic-reactor/react/dist/types';
import { VoteType } from '../../schema/vote/vote.dto';

export type RawVoteEntity = {
  postID: BigInt;
  userIdentity: Principal;
  voteType: string;
};

export type VoteEntity = {
  postID: string;
  userIdentity: string;
  voteType: string | '';
};

export function convertRawVoteEntityToVoteEntity(
  raw: RawVoteEntity,
): VoteEntity {
  return {
    postID: raw.postID.toString(),
    userIdentity: raw.userIdentity.toString(),
    voteType: raw.voteType,
  };
}
