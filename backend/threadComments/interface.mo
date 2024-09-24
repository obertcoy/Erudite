import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type ThreadComments = Types.ThreadComments;

    public type ThreadCommentsActor = actor {
        createThreadComments : (threadID : Nat64, commentID: Nat64) -> async Result.Result<ThreadComments, Text>;
    };
};

