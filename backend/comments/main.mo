import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";

import ThreadCommentsModule "../threadComments/interface";
import ThreadCommentsType "../threadComments/types";

actor class CommentMain(){
    type Comment = Types.Comment;
    type ThreadComments = ThreadCommentsType.ThreadComments;

    let commentData= TrieMap.TrieMap<Nat64, Comment>(Nat64.equal, Nat64.toNat32);
    var counter: Nat64 = 10;

    //create comment
    public shared({caller}) func createComment(commentBody: Text, commentImage: ?Blob, threadID: Nat64, threadCommentsCanisterId : Text): async Result.Result<Comment, Text>{
        let comment: Comment = createCommentObject(counter, commentBody, commentImage, caller);
        commentData.put(counter, comment);

        //sklian create relationship
        let threadCommentsActor = actor (threadCommentsCanisterId) : ThreadCommentsModule.ThreadCommentsActor;
        let result: Result.Result<ThreadComments, Text> = await threadCommentsActor.createThreadComments(threadID, counter);

        switch (result) {
            case (#ok(_)){
                counter += 1;
                return #ok(comment);
            };
            case (#err(errorMessage)){
                return #err("Failed to create comment: " # errorMessage);
            };
        };
    };

    private func createCommentObject(commentID: Nat64, commentBody: Text, commentImage: ?Blob, creatorIdentity: Principal) : Comment {
        return {
            commentID = commentID;
            commentBody = commentBody;
            commentImage = commentImage;
            internetIdentity = creatorIdentity;
        };
    };
    //get comment by ID

    //get comment by principal

}

