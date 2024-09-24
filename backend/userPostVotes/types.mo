import Result "mo:base/Result";
import Principal "mo:base/Principal";

module {
  public type Result<Ok, Err> = Result.Result<Ok, Err>;

  public type UserPostVote = {
    postID : Nat64;
    userIdentity : Principal;
    voteType : Text;
  };
};
