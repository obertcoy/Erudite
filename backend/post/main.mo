import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";

import HubPostsModule "../hubPosts/interface";
import UserModule "../user/interface";
import HubPostsType "../hubPosts/types";
import HubModule "../hub/interface";

actor class PostMain() {
  type Post = Types.Post;
  type DetailedPost = Types.DetailedPost;
  type HubPosts = HubPostsType.HubPosts;

  private func _hash32(n : Nat64) : Nat32 {
    return Nat32.fromNat(Nat64.toNat(n));
  };

  let postMap = TrieMap.TrieMap<Nat64, Post>(Nat64.equal, _hash32);
  //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
  var counter : Nat64 = 10;

  //create post
  public shared ({ caller }) func createPost(postTitle : Text, postBody : Text, postImage : ?Blob, hubID : Nat64, hubPostsCanisterId : Text) : async Result.Result<Post, Text> {
    let post : Post = _createPostObject(counter, postTitle, postBody, postImage, caller, 0, 0, 0);
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

  public shared ({ caller }) func deletePost(postId : Nat64, hubID : Nat64, hubCanisterId : Text, hubPostsCanisterId : Text, userHubMembershipCanisterId : Text) : async Result.Result<(), Text> {

    let hubPostsActor = actor (hubPostsCanisterId) : HubPostsModule.HubPostsActor;

    let result : Result.Result<(), Text> = await hubPostsActor.deleteHubPosts(caller, hubID, postId, hubCanisterId, userHubMembershipCanisterId);
    switch (result) {
      case (#ok(_)) {
        counter += 1;
        postMap.delete(postId);
        return #ok();
      };
      case (#err(errorMessage)) {
        return #err("Error: Failed to delete post: " # errorMessage);
      };
    };
  };

  private func _createPostObject(postId : Nat64, postTitle : Text, postBody : Text, postImage : ?Blob, creatorIdentity : Principal, numUpVotes : Nat64, numDownVotes : Nat64, numComments : Nat64) : Post {
    return {
      postId = postId;
      postTitle = postTitle;
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

  public shared query func getPosts(postTitleQuery : Text) : async [Post] {
    var posts = Buffer.Buffer<Post>(0);

    for (post in postMap.vals()) {
      if (Text.contains(post.postTitle, #text postTitleQuery)) {
        posts.add(post);
      };
    };

    return Buffer.toArray(posts);
  };

  //get post by ID
  public shared func getDetailedPostByID(postId : Nat64, hubId : Nat64, hubCanisterId : Text, userCanisterId : Text) : async Result.Result<DetailedPost, Text> {

    let userActor = actor (userCanisterId) : UserModule.UserActor;
    let hubActor = actor (hubCanisterId) : HubModule.HubActor;

    switch (postMap.get(postId)) {
      case null {
        return #err("Post not found");
      };
      case (?fetchedPost) {

        let user = await userActor.getUser(?Principal.toText(fetchedPost.internetIdentity));

        switch (user) {
          case (#ok(user)) {

            let hub = await hubActor.getHubByID(hubId);

            switch (hub) {
              case (#ok(hub)) {

                let detailedPost : DetailedPost = {
                  post = fetchedPost;
                  user = user;
                  hub = hub;
                };

                return #ok(detailedPost);
              };
              case (#err(err)) {
                return #err(err);
              };

            };
          };
          case (#err(err)) {
            return #err(err);
          };
        };

      };
    };
    return #err("Post not found");
  };
 
  public shared query func getPostByID(postId : Nat64) : async Result.Result<Post, Text> {

    switch (postMap.get(postId)) {
      case null {
        return #err("Post not found");
      };
      case (?fetchedPost) {
        return #ok(fetchedPost);
      };
    };
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
  public shared func updateUpvoteNum(postId : Nat64, upvoteNum : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postId)) {
      case (?res) {
        let post : Post = res;

        let updatedPost : Post = {
          postId = post.postId;
          postTitle = post.postTitle;
          postBody = post.postBody;
          postImage = post.postImage;
          internetIdentity = post.internetIdentity;
          numUpVotes = upvoteNum;
          numDownVotes = post.numDownVotes;
          numComments = post.numComments;
        };

        postMap.put(updatedPost.postId, updatedPost);
        return #ok(updatedPost);
      };
      case null {
        return #err("Error, post not found");
      };
    };
  };

  //update downvote num
  public shared func updateDownvoteNum(postId : Nat64, downvoteNum : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postId)) {
      case (?res) {
        let post : Post = res;

        let updatedPost : Post = {
          postId = post.postId;
          postTitle = post.postTitle;
          postBody = post.postBody;
          postImage = post.postImage;
          internetIdentity = post.internetIdentity;
          numUpVotes = post.numUpVotes;
          numDownVotes = downvoteNum;
          numComments = post.numComments;
        };

        postMap.put(updatedPost.postId, updatedPost);
        return #ok(updatedPost);
      };
      case null {
        return #err("Error, post not found");
      };
    };
  };

  //update comment num
  public shared func updateCommentNum(postId : Nat64, commentNum : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postId)) {
      case (?res) {
        let post : Post = res;

        let updatedPost : Post = {
          postId = post.postId;
          postTitle = post.postTitle;
          postBody = post.postBody;
          postImage = post.postImage;
          internetIdentity = post.internetIdentity;
          numUpVotes = post.numUpVotes;
          numDownVotes = post.numDownVotes;
          numComments = commentNum;
        };

        postMap.put(updatedPost.postId, updatedPost);
        return #ok(updatedPost);
      };
      case null {
        return #err("Error, post not found");
      };
    };
  };

  //get post by ID
  public shared query func getPostById(postId : Nat64) : async Result.Result<Post, Text> {
    switch (postMap.get(postId)) {
      case null {
        return #err("Post not found");
      };
      case (?fetched_post) {
        return #ok(fetched_post);
      }

    }
  };
    
};
