import {
  convertRawHubEntityToHubEntity,
  HubEntity,
  RawHubEntity,
} from '../hub/hub.entity';
import {
  convertRawUserEntityToUserEntity,
  RawUserEntity,
  UserEntity,
} from '../user/user.entity';
import {
  convertRawPostEntityToPostEntity,
  PostEntity,
  RawPostEntity,
} from './post.entity';

export type RawDetailedPostEntity = {
  post: RawPostEntity;
  user: RawUserEntity;
  hub: RawHubEntity;
};

export type DetailedPostEntity = {
  post: PostEntity;
  user: UserEntity;
  hub: HubEntity;
};

export function convertRawDetailedPostEntityToDetailedPostEntity(
  raw: RawDetailedPostEntity,
): DetailedPostEntity {
  return {
    post: convertRawPostEntityToPostEntity(raw.post),
    user: convertRawUserEntityToUserEntity(raw.user),
    hub: convertRawHubEntityToHubEntity(raw.hub),
  };
}
export function convertAllRawDetailedPostEntityToDetailedPostEntity(
  raws: RawDetailedPostEntity[],
): DetailedPostEntity[] {
  const converted: DetailedPostEntity[] = raws.map((raw) => {
    return convertRawDetailedPostEntityToDetailedPostEntity(raw);
  });

  return converted;
}
