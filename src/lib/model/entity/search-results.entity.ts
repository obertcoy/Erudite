import { HubEntity } from './hub/hub.entity';
import { PostEntity } from './post/post.entity';
import { UserEntity } from './user/user.entity';

export type SearchResultsEntity = {
  hubs: HubEntity[];
  users: UserEntity[];
  posts: PostEntity[];
};
