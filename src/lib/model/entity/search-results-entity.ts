import { HubEntity } from './hub.entity';
import { PostEntity } from './post.entity';
import { UserEntity } from './user/user.entity';

export type SearchResultsEntity = {
  hubs: HubEntity[];
  users: UserEntity[];
  posts: PostEntity[];
};
