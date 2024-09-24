import Result "mo:base/Result";
import Principal "mo:base/Principal";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type UserHubMembership = {
      hubID : Nat64;
      userIdentity: Principal;
      userRole: Text;
   };
};