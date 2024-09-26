import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Nat32 "mo:base/Nat32";

import HubPostsModule "../hubPosts/interface";
import HubPostsType "../hubPosts/types";

actor class PostMain() {
  type Post = Types.Post;
  type HubPosts = HubPostsType.HubPosts;

  private func _hash32(n : Nat64) : Nat32 {
    return Nat32.fromNat(Nat64.toNat(n));
  };

  let postMap = TrieMap.TrieMap<Nat64, Post>(Nat64.equal, _hash32);
  //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
  var counter : Nat64 = 10;

  //create post
  public shared ({ caller }) func createPost(postBody : Text, postImage : ?Blob, hubID : Nat64, hubPostsCanisterId : Text) : async Result.Result<Post, Text> {
    let post : Post = createPostObject(counter, postBody, postImage, caller, 0, 0, 0);
    postMap.put(counter, post);

    //sklian create relationship
    let hubPostsActor = actor (hubPostsCanisterId) : HubPostsModule.HubPostsActor;
    let result : Result.Result<HubPosts, Text> = await hubPostsActor.createHubPosts(hubID, counter);
    switch (result) {
      case (#ok(_)) {
        counter += 1;
        return #ok(post);
      };
      case (#err(errorMessage)) {
        return #err("Failed to create post: " # errorMessage);
      };
    };
  };

  public shared ({ caller }) func deletePost(postID : Nat64, hubID : Nat64, hubCanisterId : Text, hubPostsCanisterId : Text, userHubMembershipCanisterId : Text) : async Result.Result<(), Text> {

    let hubPostsActor = actor (hubPostsCanisterId) : HubPostsModule.HubPostsActor;

    let result : Result.Result<(), Text> = await hubPostsActor.deleteHubPosts(caller, hubID, postID, hubCanisterId, userHubMembershipCanisterId);
    switch (result) {
      case (#ok(_)) {
        counter += 1;
        postMap.delete(postID);
        return #ok();
      };
      case (#err(errorMessage)) {
        return #err("Error: Failed to delete post: " # errorMessage);
      };
    };
  };

  private func createPostObject(postID : Nat64, postBody : Text, postImage : ?Blob, creatorIdentity : Principal, numUpVotes : Nat64, numDownVotes : Nat64, numComments : Nat64) : Post {
    return {
      postID = postID;
      postBody = postBody;
      postImage = postImage;
      internetIdentity = creatorIdentity;
      numUpVotes = numUpVotes;
      numDownVotes = numDownVotes;
      numComments = numComments;
    };
  };

  //get all post
  public shared query func getAllPost() : async Result.Result<[Post], Text> {
    var buffer = Buffer.Buffer<Post>(0);
    for (post in postMap.vals()) {
      buffer.add(post);
    };
    return #ok(Buffer.toArray(buffer));
  };

  //get post by ID
  public shared query func getPostByID(postID : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postID)) {
      case null {
        return #err("Post not found");
      };
      case (?fetched_post) {
        return #ok(fetched_post);
      };
    };
        return #err("Post not found");
  };

  //get post by internet identity -> get post by user
  public shared query func getPostByPrincipal(principal : ?Principal) : async Result.Result<[Post], Text> {
    switch principal {
      case null {
        return #err("Principal ID is invalid");
      };
      case (?validPrincipal) {
        var buffer = Buffer.Buffer<Post>(0);
        for (post in postMap.vals()) {
          if (post.internetIdentity == validPrincipal) {
            buffer.add(post);
          };
        };
        return #ok(Buffer.toArray(buffer));
      };
    };
  };

  //update upvote num
  public shared func updateUpvoteNum(postID : Nat64, upvoteNum : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postID)) {
      case (?res) {
        let post : Post = res;

        let updatedPost = {
          postID = post.postID;
          postBody = post.postBody;
          postImage = post.postImage;
          internetIdentity = post.internetIdentity;
          numUpVotes = upvoteNum;
          numDownVotes = post.numDownVotes;
          numComments = post.numComments;
        };

        postMap.put(updatedPost.postID, updatedPost);
        return #ok(updatedPost);
      };
      case null {
        return #err("Error, post not found");
      };
    };
  };
  
  //update downvote num
  public shared func updateDownvoteNum(postID : Nat64, downvoteNum : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postID)) {
      case (?res) {
        let post : Post = res;

        let updatedPost = {
          postID = post.postID;
          postBody = post.postBody;
          postImage = post.postImage;
          internetIdentity = post.internetIdentity;
          numUpVotes = post.numUpVotes;
          numDownVotes = downvoteNum;
          numComments = post.numComments;
        };

        postMap.put(updatedPost.postID, updatedPost);
        return #ok(updatedPost);
      };
      case null {
        return #err("Error, post not found");
      };
    };
  };

  //update comment num
  public shared func updateCommentNum(postID : Nat64, commentNum : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postID)) {
      case (?res) {
        let post : Post = res;

        let updatedPost = {
          postID = post.postID;
          postBody = post.postBody;
          postImage = post.postImage;
          internetIdentity = post.internetIdentity;
          numUpVotes = post.numUpVotes;
          numDownVotes = post.numDownVotes;
          numComments = commentNum;
        };

        postMap.put(updatedPost.postID, updatedPost);
        return #ok(updatedPost);
      };
      case null {
        return #err("Error, post not found");
      };
    };
  };
};
