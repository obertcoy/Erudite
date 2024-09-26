import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Types "./types";

module {
  type Result<Ok, Error> = Result.Result<Ok, Error>;
  type HubPosts = Types.HubPosts;

  public type HubPostsActor = actor {
    createHubPosts : (hubId : Nat64, postId : Nat64) -> async Result.Result<HubPosts, Text>;
    deleteHubPosts : (caller : Principal, hubId : Nat64, postId : Nat64, hubCanisterId : Text, userHubMembershipCanisterId : Text) -> async Result.Result<(), Text>;
  };
};
