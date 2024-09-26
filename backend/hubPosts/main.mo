import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Types "types";

import PostModule "../post/interface";
import PostType "../post/types";

import HubModule "../hub/interface";
import HubType "../hub/types";
import UserHubMembershipModule "../userHubMembership/interface";

actor class HubPosts() {
  type HubPosts = Types.HubPosts;
  type HubPostProfile = Types.HubPostProfile;
  type Post = PostType.Post;
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

  //get all post by hub ID
  public shared func getAllPostByHubID(hubID : Nat64, postCanisterId : Text) : async Result.Result<[Post], Text> {
    var buffer = Buffer.Buffer<Post>(0);
    let postActor = actor (postCanisterId) : PostModule.PostActor;
    for (hubPost in hubPostMap.vals()) {
      if (hubPost.hubID == hubID) {
        let result : Result.Result<Post, Text> = await postActor.getPostByID(?hubPost.postID);
        switch (result) {
          case (#ok(post)) {
            buffer.add(post);
          };
          case (#err(_)) {};
        };
      };
    };

    return #ok(Buffer.toArray(buffer));
  };

  //get hub posts by post id
  public shared query func getHubPostByPostID(postID : Nat64) : async Result.Result<HubPosts, Text> {
    for (hubPost in hubPostMap.vals()) {
      if (hubPost.postID == postID) {
        return #ok(hubPost);
      };
    };

    return #err("Hub Post not found");
  };

  //get hub post profile by principal
  public shared ({ caller }) func getAllPostProfileByPrincipal(postCanisterId : Text, hubCanisterId : Text) : async Result.Result<[HubPostProfile], Text> {
    var buffer = Buffer.Buffer<HubPostProfile>(0);
    let postActor = actor (postCanisterId) : PostModule.PostActor;
    let result : Result.Result<[Post], Text> = await postActor.getPostByPrincipal(?caller);
    let hubActor = actor (hubCanisterId) : HubModule.HubActor;

    switch (result) {
      case (#ok(posts)) {
        for (post in posts.vals()) {
          let hubPost : Result.Result<HubPosts, Text> = await getHubPostByPostID(post.postId);
          switch (hubPost) {
            case (#ok(hubPost)) {
              let res : Result.Result<Hub, Text> = await hubActor.getHubByID(hubPost.hubID);
              switch (res) {
                case (#ok(hub)) {
                  let temp : HubPostProfile = {
                    postID = post.postId;
                    postBody = post.postBody;
                    postImage = post.postImage;
                    internetIdentity = post.internetIdentity;
                    numUpVotes = post.numUpVotes;
                    numDownVotes = post.numDownVotes;
                    numComments = post.numComments;
                    hubID = hub.hubID;
                    hubName = hub.hubName;
                  };
                  buffer.add(temp);
                };
                case (#err(_)) {};
              };
            };
            case (#err(_)) {};
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
