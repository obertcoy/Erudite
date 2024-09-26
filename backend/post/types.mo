import Result "mo:base/Result";
import Text "mo:base/Text";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //post datatype
    public type Post = {
      postId: Nat64;
      postTitle: Text;
      postBody: Text;
      postImage: ?Blob;
      internetIdentity : Principal;
      numUpVotes: Nat64;
      numDownVotes: Nat64;
      numComments: Nat64;
   };

};