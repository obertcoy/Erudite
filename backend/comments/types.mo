import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //comment datatype
    public type Comment = {
      commentID: Nat64;
      commentBody: Text;
      commentImage: Blob;
      internetIdentity : Principal;
   };

};