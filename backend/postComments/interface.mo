import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type PostComments = Types.PostComments;

    public type PostCommentsActor = actor {
        createPostComments : (postID : Nat64, commentID: Nat64) -> async Result.Result<PostComments, Text>;
    };
};

