import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Types "types";

import PostModule "../post/interface";
import PostType "../post/types";

import HubType "../hub/types";
import UserHubMembershipModule "../userHubMembership/interface";

actor class HubPosts() {
  type HubPosts = Types.HubPosts;
  type HubPostProfile = Types.HubPostProfile;
  type Post = PostType.Post;
  type DetailedPost = PostType.DetailedPost;
  type Hub = HubType.Hub;
  type Role = HubType.Role;

  //hubID + "-" + post ID as key
  let hubPostMap = HashMap.HashMap<Text, HubPosts>(0, Text.equal, Text.hash);

  //create hub posts
  public shared func createHubPosts(hubID : Nat64, postID : Nat64) : async Result.Result<HubPosts, Text> {
    let hubPost : HubPosts = {
      postID = postID;
      hubID = hubID;
    };

    let key = Nat64.toText(hubID) # "-" # Nat64.toText(postID);

    hubPostMap.put(key, hubPost);

    return #ok(hubPost);

  };

  public shared func deleteHubPosts(caller : Principal, hubID : Nat64, postID : Nat64, hubCanisterId : Text, userHubMembershipCanisterId : Text) : async Result.Result<(), Text> {

    let key = Nat64.toText(hubID) # "-" # Nat64.toText(postID);
    let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;

    let callerRoleResult : Result.Result<Role, Text> = await userHubMembershipActor.getMembershipRole(?caller, hubID, hubCanisterId);

    switch (callerRoleResult) {
      case (#ok(role)) {

        if (role.permissions.canDeletePost) {
          hubPostMap.delete(key);

          return #ok();
        } else {
          return #err("Error: Insufficient permissions to delete post.");
        };
      };

      case (#err(err)) {
        return #err(err);
      };
    };
  };

  //get all detailed posts
  public shared func getAllDetailedPosts(postCanisterId : Text, hubCanisterId : Text, userCanisterId : Text) : async Result.Result<[DetailedPost], Text> {
    var buffer = Buffer.Buffer<DetailedPost>(0);

    for (hubPost in hubPostMap.vals()) {

      let detailedPosts : Result.Result<[DetailedPost], Text> = await getHubDetailedPosts(hubPost.hubID, postCanisterId, hubCanisterId, userCanisterId);

      switch (detailedPosts) {
        case (#err(err)) {
          return #err(err);

        };
        case (#ok(detailedPosts)) {

          let fetchedBuffer = Buffer.fromArray<DetailedPost>(detailedPosts);

          buffer.insertBuffer(buffer.size(), fetchedBuffer);
        };
      };
    };

    return #ok(Buffer.toArray(buffer));
  };

  // get joined hub posts
  public shared ({ caller }) func getJoinedHubDetailedPosts(postCanisterId : Text, hubCanisterId : Text, userCanisterId : Text, userHubMembershipCanisterId : Text) : async Result.Result<[DetailedPost], Text> {

    let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;

    let joinedHubs : Result.Result<[Hub], Text> = await userHubMembershipActor.getJoinedHubs(?Principal.toText(caller), hubCanisterId);
    switch (joinedHubs) {
      case (#err(err)) {
        return #err(err);
      };
      case (#ok(joinedHubs)) {

        var buffer = Buffer.Buffer<DetailedPost>(0);

        for (hub in joinedHubs.vals()) {

          let detailedPosts : Result.Result<[DetailedPost], Text> = await getHubDetailedPosts(hub.hubID, postCanisterId, hubCanisterId, userCanisterId);

          switch (detailedPosts) {
            case (#err(err)) {
              return #err(err);

            };
            case (#ok(detailedPosts)) {

              let fetchedBuffer = Buffer.fromArray<DetailedPost>(detailedPosts);

              buffer.insertBuffer(buffer.size(), fetchedBuffer);
            };
          };

        };

        return #ok(Buffer.toArray(buffer));
      };
    };

  };

  //get all post by hub ID
  public shared func getHubDetailedPosts(hubId : Nat64, postCanisterId : Text, hubCanisterId : Text, userCanisterId : Text) : async Result.Result<[DetailedPost], Text> {
    var buffer = Buffer.Buffer<DetailedPost>(0);

    let postActor = actor (postCanisterId) : PostModule.PostActor;

    for (hubPost in hubPostMap.vals()) {
      if (hubPost.hubID == hubId) {

        let detailedPost : Result.Result<DetailedPost, Text> = await postActor.getDetailedPostByID(hubPost.postID, hubPost.hubID, hubCanisterId, userCanisterId);
        switch (detailedPost) {
          case (#ok(detailedPost)) {

            buffer.add(detailedPost);
          };
          case (#err(err)) {
            return #err(err);
          };
        };
      };
    };

    return #ok(Buffer.toArray(buffer));
  };

  //get hub posts by post id
  public shared func getHubDetailedPostByPostID(postId : Nat64, postCanisterId : Text, hubCanisterId : Text, userCanisterId : Text) : async Result.Result<DetailedPost, Text> {

    let postActor = actor (postCanisterId) : PostModule.PostActor;

    for (hubPost in hubPostMap.vals()) {
      if (hubPost.postID == postId) {

        let detailedPost : Result.Result<DetailedPost, Text> = await postActor.getDetailedPostByID(hubPost.postID, hubPost.hubID, hubCanisterId, userCanisterId);

        switch (detailedPost) {
          case (#ok(detailedPost)) {

            return #ok(detailedPost);
          };
          case (#err(err)) {
            return #err(err);
          };
        };
      };
    };

    return #err("Hub Post not found");
  };

  //get hub post profile by principal
  public shared ({ caller }) func getUserDetailedPosts(userId : ?Text, postCanisterId : Text, hubCanisterId : Text, userCanisterId : Text) : async Result.Result<[DetailedPost], Text> {
    var buffer = Buffer.Buffer<DetailedPost>(0);

    let principal = switch (userId) {
      case (?userId) {
        Principal.fromText(userId);
      };
      case null {
        caller;
      };
    };

    let postActor = actor (postCanisterId) : PostModule.PostActor;
    let result : Result.Result<[Post], Text> = await postActor.getPostByPrincipal(?principal);

    switch (result) {
      case (#ok(posts)) {
        for (post in posts.vals()) {

          let detailedPost : Result.Result<DetailedPost, Text> = await getHubDetailedPostByPostID(post.postId, postCanisterId, hubCanisterId, userCanisterId);
          switch (detailedPost) {
            case (#ok(detailedPost)) {

              buffer.add(detailedPost);
            };
            case (#err(err)) {
              return #err(err);
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

};
