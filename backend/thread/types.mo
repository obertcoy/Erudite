import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //thread datatype
    public type Thread = {
      threadID: Nat64;
      threadBody: Text;
      threadImage: ?Blob;
      internetIdentity : Principal;
      numUpVotes: Nat64;
      numDownVotes: Nat64;
      numComments: Nat64;
   };

};