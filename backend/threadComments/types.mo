import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type ThreadComments = {
      threadID : Nat64;
      commentID : Nat64;
   };
};