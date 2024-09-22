import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //hub datatype
    public type Hub = {
      hubID: Nat64;
      hubName: Text;
      hubDescription: Text;
      hubBanner: ?Blob;
      hubProfile: ?Blob;
   };
};