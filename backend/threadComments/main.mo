import Types "types";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Buffer "mo:base/Buffer";

import ThreadModule "../thread/interface";
import ThreadType "../thread/types";

import CommentModule "../comments/interface";
import CommentType "../comments/types";


actor class ThreadComments(){
    type ThreadComments = Types.ThreadComments;
    type ThreadCommentsProfile = Types.ThreadCommentsProfile;
    type Comment = CommentType.Comment;
    type Thread = ThreadType.Thread;

    //threadID + "-" + commentID
    let threadCommentsData = HashMap.HashMap<Text, ThreadComments>(0, Text.equal, Text.hash);

    //create thread comments
    public shared ({caller}) func createThreadComments(threadID : Nat64, commentID: Nat64):async Result.Result<ThreadComments, Text>{
        let threadComment: ThreadComments = {
            threadID = threadID;
            commentID = commentID;
        };

        let key = Nat64.toText(threadID) # "-" # Nat64.toText(commentID);

        threadCommentsData.put(key, threadComment);

        return #ok(threadComment);
    };

    //get all comment by thread id
    public func getAllCommentByThreadID(threadID : Nat64, commentCanisterId: Text): async Result.Result<[Comment], Text>{
        var buffer = Buffer.Buffer<Comment>(0);
        let commentActor = actor (commentCanisterId) : CommentModule.CommentsActor;
        for (threadComment in threadCommentsData.vals()){
            if(threadComment.threadID == threadID){
                let result: Result.Result<Comment, Text> = await commentActor.getCommentByID(?threadComment.commentID);
                switch (result) {
                    case (#ok(comment)) {
                        buffer.add(comment); 
                    };
                    case (#err(_)) {
                    };
                };
            };
        };

        return #ok(Buffer.toArray(buffer));
    };

    //get thread comment by comment id
    public func getThreadCommentByCommentID(commentID : Nat64): async Result.Result<ThreadComments, Text>{
        for (threadComment in threadCommentsData.vals()){
            if(threadComment.commentID == commentID){
                return #ok(threadComment);
            };
        };

        return #err("Thread comment not found");
    };

    //get thread comment profile by principal
    public shared ({caller}) func getAllThreadProfileByPrincipal(commentCanisterId: Text, threadCanisterId: Text) : async Result.Result<[ThreadCommentsProfile], Text> {
        var buffer = Buffer.Buffer<ThreadCommentsProfile>(0);
        let commentActor = actor (commentCanisterId) : CommentModule.CommentsActor;
        let result: Result.Result<[Comment], Text> = await commentActor.getCommentByPrincipal(?caller);

        let threadActor = actor (threadCanisterId) : ThreadModule.ThreadActor;

        switch (result) {
            case (#ok(comments)) {  
                for (comment in comments.vals()) {
                    let threadComment : Result.Result<ThreadComments, Text> = await getThreadCommentByCommentID(comment.commentID);
                    switch (threadComment){
                        case(#ok(threadComment)){
                            let res: Result.Result<Thread, Text> = await threadActor.getThreadByID(?threadComment.threadID);
                            switch (res) {
                                case (#ok(thread)) {
                                    let temp : ThreadCommentsProfile = {
                                            threadID = thread.threadID;
                                            threadBody = thread.threadBody;
                                            threadImage = thread.threadImage;
                                            threadInternetIdentity = thread.internetIdentity;
                                            numUpVotes = thread.numUpVotes;
                                            numDownVotes = thread.numDownVotes;
                                            numComments = thread.numComments;
                                            
                                            commentID  = comment.commentID;
                                            commentBody = comment.commentBody;
                                            commentImage = comment.commentImage;
                                            commentInternetIdentity = comment.internetIdentity;
                                    };
                                    buffer.add(temp);
                                };
                                case (#err(_)) {
                                };
                            }
                        };
                        case(#err(_)){
                        };
                    };
                };
                return #ok(Buffer.toArray(buffer));
            };
            case (#err(errorMessage)) {
                return #err(errorMessage);
            };
        };
    };
}