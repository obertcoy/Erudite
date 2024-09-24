import Result "mo:base/Result";
import Principal "mo:base/Principal";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type UserThreadVote = {
      threadID : Nat64;
      userIdentity: Principal;
      voteType: Text;
   };
};