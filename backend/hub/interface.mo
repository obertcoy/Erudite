import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type Hub = Types.Hub;

    public type HubActor = actor {
        getHubByID : (hubID:Nat64) -> async Result.Result<Hub, Text>;
    };
};

