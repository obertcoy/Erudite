export type VoteDto = {
  postId: string;
  voteType: string;
};

export enum VoteType {
  UP = 'up',
  DOWN = 'down',
}
