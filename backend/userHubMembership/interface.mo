import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Types "./types";
import HubType "../hub/types"

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type UserHubMembership = Types.UserHubMembership;
    type Role = HubType.Role;

    public type UserHubMembershipActor = actor {
        createMembership: (owner: ?Principal, hubID: Nat64, membershipType: Text) -> async Result.Result<UserHubMembership, Text>;
        getMembershipRole : (principal : ?Principal, hubID : Nat64, hubCanisterId: Text) -> async  Result.Result<Role, Text>;
    };
};

