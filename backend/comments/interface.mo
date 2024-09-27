import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type Comment = Types.Comment;

    public type CommentsActor = actor {
        getUserComment : (principal : ?Principal) -> async Result.Result<[Comment], Text>;
        getCommentByID : (commentID:?Nat64) -> async Result.Result<Comment, Text>;
    };
};

