import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //user datatype
    public type User = {
      internetIdentity : Principal;
      email : Text;
      numJoinedHubs : Nat;
      username : Text;
      bio: Text;
      profileImage: ?Blob;
      bannerImage: ?Blob;
   };
};