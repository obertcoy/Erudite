import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Nat32 "mo:base/Nat32";

import PostCommentsModule "../postComments/interface";
import PostCommentsType "../postComments/types";

actor class CommentMain() {
  type Comment = Types.Comment;
  type PostComments = PostCommentsType.PostComments;

  private func _hash32(n : Nat64) : Nat32 {
    return Nat32.fromNat(Nat64.toNat(n));
  };

  let commentData = TrieMap.TrieMap<Nat64, Comment>(Nat64.equal, _hash32);
  var counter : Nat64 = 10;

  //create comment
  public shared ({ caller }) func createComment(commentBody : Text, commentImage : Blob, postID : Nat64, postCommentsCanisterId : Text) : async Result.Result<Comment, Text> {
    let comment : Comment = _createCommentObject(counter, commentBody, commentImage, caller);
    commentData.put(counter, comment);

    //sklian create relationship
    let postCommentsActor = actor (postCommentsCanisterId) : PostCommentsModule.PostCommentsActor;
    let result : Result.Result<PostComments, Text> = await postCommentsActor.createPostComments(postID, counter);

    switch (result) {
      case (#ok(_)) {
        counter += 1;
        return #ok(comment);
      };
      case (#err(errorMessage)) {
        return #err("Failed to create comment: " # errorMessage);
      };
    };
  };

  private func _createCommentObject(commentID : Nat64, commentBody : Text, commentImage : Blob, creatorIdentity : Principal) : Comment {
    return {
      commentID = commentID;
      commentBody = commentBody;
      commentImage = commentImage;
      internetIdentity = creatorIdentity;
    };
  };
  //get comment by ID
  public shared query func getCommentByID(commentID : Nat64) : async Result.Result<Comment, Text> {
    switch (commentData.get(commentID)) {
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
  public shared query func getCommentByPrincipal(principal : ?Principal) : async Result.Result<[Comment], Text> {
    switch principal {
      case null {
        return #err("Principal ID is invalid");
      };
      case (?validPrincipal) {
        var buffer = Buffer.Buffer<Comment>(0);
        for (comment in commentData.vals()) {
          if (comment.internetIdentity == validPrincipal) {
            buffer.add(comment);
          };
        };
        return #ok(Buffer.toArray(buffer));
      };
    };
  };

};
