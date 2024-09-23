import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type UserHubMembership = Types.UserHubMembership;

    public type UserHubMembershipActor = actor {
        createMembership: (hubID: Nat64, membershipType: Text) -> async Result.Result<UserHubMembership, Text>;
        getMembershipRole : (principal : ?Principal, hubID : Nat64) -> async  Result.Result<Text, Text>;
    };
};

