import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type HubThreads = Types.HubThreads;

    public type HubThreadsActor = actor {
        createHubThreads : (hubID : Nat64, threadID: Nat64) -> async Result.Result<HubThreads, Text>;
    };
};

