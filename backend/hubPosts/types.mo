import Result "mo:base/Result";
import Nat64 "mo:base/Nat64";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type HubPosts = {
      postID : Nat64;
      hubID : Nat64;
    };

    public type HubPostProfile = {
      postID : Nat64;
      postBody: Text;
      postImage: ?Blob;
      internetIdentity : Principal;
      numUpVotes: Nat64;
      numDownVotes: Nat64;
      numComments: Nat64;
      hubID : Nat64;
      hubName : Text;
    };
};