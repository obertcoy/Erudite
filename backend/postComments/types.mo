import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type PostComments = {
      postID : Nat64;
      commentId : Nat64;
   };

    public type PostCommentsProfile = {
      postID : Nat64;
      postBody: Text;
      postImage: ?Blob;
      postInternetIdentity : Principal;
      numUpVotes: Nat64;
      numDownVotes: Nat64;
      numComments: Nat64;
      commentId : Nat64;
      commentBody: Text;
      commentInternetIdentity : Principal;
   };
};