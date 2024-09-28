export type VoteDto = {
  postId: string;
  voteType: VoteType;
};

export enum VoteType {
  UP = 'up',
  DOWN = 'down',
}
