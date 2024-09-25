import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //post datatype
    public type Post = {
      postID: Nat64;
      postBody: Text;
      postImage: ?Blob;
      internetIdentity : Principal;
      numUpVotes: Nat64;
      numDownVotes: Nat64;
      numComments: Nat64;
   };

};