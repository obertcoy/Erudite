import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type Thread = Types.Thread;

    public type ThreadActor = actor {
        getThreadByID : (threadID:?Nat64) -> async Result.Result<Thread, Text>;
        getThreadByPrincipal : (principal : ?Principal) -> async Result.Result<[Thread], Text>;
    };
};

