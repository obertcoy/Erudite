import Types "types";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";

import PostModule "../post/interface";
import PostType "../post/types";

import CommentModule "../comments/interface";
import CommentType "../comments/types";


actor class PostComments(){
    type PostComments = Types.PostComments;
    type PostCommentsProfile = Types.PostCommentsProfile;
    type Comment = CommentType.Comment;
    type Post = PostType.Post;

    //postID + "-" + commentId
    let postCommentsMap = HashMap.HashMap<Text, PostComments>(0, Text.equal, Text.hash);

    //create post comments
    public shared func createPostComments(postID : Nat64, commentId: Nat64):async Result.Result<PostComments, Text>{
        let postComment: PostComments = {
            postID = postID;
            commentId = commentId;
        };

        let key = Nat64.toText(postID) # "-" # Nat64.toText(commentId);

        postCommentsMap.put(key, postComment);

        return #ok(postComment);
    };

    //get all comment by post id
    public func getCommentsByPostID(postID : Nat64, commentCanisterId: Text): async Result.Result<[Comment], Text>{
        var buffer = Buffer.Buffer<Comment>(0);
        let commentActor = actor (commentCanisterId) : CommentModule.CommentsActor;
        for (postComment in postCommentsMap.vals()){
            if(postComment.postID == postID){
                let result: Result.Result<Comment, Text> = await commentActor.getCommentByID(postComment.commentId);
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

    //get post comment by comment id
    public func getPostCommentByCommentID(commentId : Nat64): async Result.Result<PostComments, Text>{
        for (postComment in postCommentsMap.vals()){
            if(postComment.commentId == commentId){
                return #ok(postComment);
            };
        };

        return #err("Post comment not found");
    };

    //get post comment profile by principal
    public shared  func getUserPostCommentsProfile(userPrincipal: Text, commentCanisterId: Text, postCanisterId: Text) : async Result.Result<[PostCommentsProfile], Text> {
        var buffer = Buffer.Buffer<PostCommentsProfile>(0);
        let commentActor = actor (commentCanisterId) : CommentModule.CommentsActor;
        let result: Result.Result<[Comment], Text> = await commentActor.getUserComment(?Principal.fromText(userPrincipal));

        let postActor = actor (postCanisterId) : PostModule.PostActor;

        switch (result) {
            case (#ok(comments)) {  
                for (comment in comments.vals()) {
                    let postComment : Result.Result<PostComments, Text> = await getPostCommentByCommentID(comment.commentId);
                    switch (postComment){
                        case(#ok(postComment)){
                            let res: Result.Result<Post, Text> = await postActor.getPostById(postComment.postID);
                            switch (res) {
                                case (#ok(post)) {
                                    let temp : PostCommentsProfile = {
                                            postID = post.postId;
                                            postBody = post.postBody;
                                            postImage = post.postImage;
                                            postInternetIdentity = post.internetIdentity;
                                            numUpVotes = post.numUpVotes;
                                            numDownVotes = post.numDownVotes;
                                            numComments = post.numComments;
                                            commentId  = comment.commentId;
                                            commentBody = comment.commentBody;
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