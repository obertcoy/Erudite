import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type ThreadComments = {
      threadID : Nat64;
      commentID : Nat64;
   };

    public type ThreadCommentsProfile = {
      threadID : Nat64;
      threadBody: Text;
      threadImage: ?Blob;
      threadInternetIdentity : Principal;
      numUpVotes: Nat64;
      numDownVotes: Nat64;
      numComments: Nat64;
      
      commentID : Nat64;
      commentBody: Text;
      commentImage: ?Blob;
      commentInternetIdentity : Principal;
   };
};