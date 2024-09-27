import Result "mo:base/Result";
import Types "./types";

module {
    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type Post = Types.Post;
    type DetailedPost = Types.DetailedPost;

    public type PostActor = actor {
        getDetailedPostByID : (postId : Nat64, hubId : Nat64, hubCanisterId : Text, userCanisterId : Text) -> async Result.Result<DetailedPost, Text>;
        getPostByPrincipal : (principal : ?Principal) -> async Result.Result<[Post], Text>;
        updateCommentNum : (postID : Nat64, commentNum : Nat64) -> async Result.Result<Post, Text>;
        updateUpvoteNum : (postID : Nat64, upvoteNum : Nat64) -> async Result.Result<Post, Text>;
        updateDownvoteNum : (postID : Nat64, downvoteNum : Nat64) -> async Result.Result<Post, Text>;
        getPostById : (postId : Nat64) -> async Result.Result<Post, Text>;
    };
};

