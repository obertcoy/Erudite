import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //user datatype
    public type User = {
      internetIdentity: Principal;
      email : Text;
      username : Text;
      gender: Text;
      bio: Text;
      profileImage: Blob;
      bannerImage: Blob;
      numFollowers: Nat64;
      numFollowing: Nat64;
   };
};