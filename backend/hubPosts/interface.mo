import Result "mo:base/Result";
import Types "./types";

module {
  type Result<Ok, Error> = Result.Result<Ok, Error>;
  type HubPosts = Types.HubPosts;

  public type HubPostsActor = actor {
    createHubPosts : (hubID : Nat64, postID : Nat64) -> async Result.Result<HubPosts, Text>;
    deleteHubPosts : (hubID : Nat64, postID : Nat64, hubCanisterId: Text, userHubMembershipCanisterId: Text) -> async Result.Result<(), Text>;
  };
};
