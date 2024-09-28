import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Types "./types";
import HubType "../hub/types"

module {
  type Result<Ok, Error> = Result.Result<Ok, Error>;
  type UserHubMembership = Types.UserHubMembership;
  type Role = HubType.Role;
  type Hub = HubType.Hub;

  public type UserHubMembershipActor = actor {
    getJoinedHubs : (userPrincipal : ?Text, hubCanisterId : Text) -> async Result.Result<[Hub], Text>;
    createMembership : (owner : ?Principal, hubID : Nat64, ownerRole : Text, hubCanisterId : ?Text) -> async Result.Result<UserHubMembership, Text>;
    getMembershipRole : (principal : ?Principal, hubID : Nat64, hubCanisterId : Text) -> async Result.Result<Role, Text>;
  };
};
