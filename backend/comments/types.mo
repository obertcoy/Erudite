import Result "mo:base/Result";
import Text "mo:base/Text";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //comment datatype
    public type Comment = {
      commentId: Nat64;
      commentBody: Text;
      internetIdentity : Principal;
   };

};