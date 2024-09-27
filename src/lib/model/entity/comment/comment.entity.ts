import { Principal } from '@ic-reactor/react/dist/types';
import { UserEntity } from '../user/user.entity';

export type RawCommentEntity = {
  commentId: BigInt;
  commentBody: string;
  internetIdentity: Principal;
};

export type CommentEntity = {
  commentId: string;
  commentBody: string;
  internetIdentity: string;
};

export type UserCommentEntity = {
  comment: CommentEntity;
  user: UserEntity;
};

export function convertRawCommentEntityToCommentEntity(
  raw: RawCommentEntity,
): CommentEntity {
  return {
    commentId: raw.commentId.toString(),
    commentBody: raw.commentBody,
    internetIdentity: raw.internetIdentity.toString(),
  };
}

export function convertAllRawCommentEntityToCommentEntity(
  raws: RawCommentEntity[],
): CommentEntity[] {
  const converted: CommentEntity[] = raws.map((raw) => {
    return convertRawCommentEntityToCommentEntity(raw);
  });

  return converted;
}
