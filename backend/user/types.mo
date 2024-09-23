import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //user datatype
    public type User = {
      email : Text;
      username : Text;
      gender: Text;
      bio: Text;
      profileImage: Blob;
      bannerImage: Blob;
   };
};