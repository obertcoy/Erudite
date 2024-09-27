import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Nat32 "mo:base/Nat32";

import PostCommentsModule "../postComments/interface";
import PostCommentsType "../postComments/types";

import PostModule "../post/interface";
import PostType "../post/types";

actor class CommentMain() {
  type Comment = Types.Comment;
  type PostComments = PostCommentsType.PostComments;
  type Post = PostType.Post;

  private func _hash32(n : Nat64) : Nat32 {
    return Nat32.fromNat(Nat64.toNat(n));
  };

  let commentMap = TrieMap.TrieMap<Nat64, Comment>(Nat64.equal, _hash32);
  var counter : Nat64 = 10;

  //create comment
  public shared ({ caller }) func createComment(
    commentBody : Text,
    postID : Nat64,
    postCommentsCanisterId : Text,
    postCanisterId : Text,
  ) : async Result.Result<Comment, Text> {

    let comment : Comment = _createCommentObject(counter, commentBody, caller);

    // Create relationship with PostCommentsActor
    let postCommentsActor = actor (postCommentsCanisterId) : PostCommentsModule.PostCommentsActor;
    let result : Result.Result<PostComments, Text> = await postCommentsActor.createPostComments(postID, counter);

    //update num comments in post
    switch (result) {
      case (#ok(_)) {

        let postActor = actor (postCanisterId) : PostModule.PostActor;
        let res : Result.Result<Post, Text> = await postActor.getPostById(postID);

        switch (res) {
          case (#ok(fetchedPost)) {
            let updatedPost : Post = fetchedPost;
            let newCommentCount : Nat64 = updatedPost.numComments + 1;

            let updateResult : Result.Result<Post, Text> = await postActor.updateCommentNum(postID, newCommentCount);

            switch (updateResult) {
              case (#ok(_)) {
                commentMap.put(counter, comment);
                counter += 1;
                return #ok(comment);
              };
              case (#err(updateErrorMessage)) {
                return #err("Failed to update comment count: " # updateErrorMessage);
              };
            };
          };
          case (#err(fetchErrorMessage)) {
            return #err("Failed to retrieve post: " # fetchErrorMessage);
          };
        };
      };
      case (#err(errorMessage)) {
        return #err("Failed to create comment: " # errorMessage);
      };
    };
  };

  private func _createCommentObject(commentId : Nat64, commentBody : Text, creatorIdentity : Principal) : Comment {
    return {
      commentId = commentId;
      commentBody = commentBody;
      internetIdentity = creatorIdentity;
    };
  };
  //get comment by ID
  public shared query func getCommentByID(commentId : Nat64) : async Result.Result<Comment, Text> {
    switch (commentMap.get(commentId)) {
      case null {
        return #err("Comment not found");
      };
      case (?fetched_comment) {
        return #ok(fetched_comment);
      };
    };
    return #err("Comment not found");
  };

  //get comment by principal
  public shared query func getUserComment(principal : ?Principal) : async Result.Result<[Comment], Text> {
    switch principal {
      case null {
        return #err("Principal ID is invalid");
      };
      case (?validPrincipal) {
        var buffer = Buffer.Buffer<Comment>(0);
        for (comment in commentMap.vals()) {
          if (comment.internetIdentity == validPrincipal) {
            buffer.add(comment);
          };
        };
        return #ok(Buffer.toArray(buffer));
      };
    };
  };

};
