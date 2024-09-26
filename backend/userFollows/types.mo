import Result "mo:base/Result";
import Principal "mo:base/Principal";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //user follow datatype
    public type UserFollows = {
      internetIdentity: Principal;
      followedUser: Principal;
   };

};