import Types "types";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";

import PostModule "../post/interface";
import PostType "../post/types";

actor class UserPostVoteMain() {
    type UserPostVote = Types.UserPostVote;
    type Post = PostType.Post;

    let userPostVoteMap = HashMap.HashMap<Text, UserPostVote>(0, Text.equal, Text.hash);
    
    //create user post vote
    public shared ({caller}) func createUserPostVote(postID : Nat64, voteType: Text, postCanisterId:Text):async Result.Result<UserPostVote, Text>{
        let userPostVote: UserPostVote = {
            postID = postID;
            userIdentity = caller;
            voteType = voteType;
        };

        let principal = Principal.toText(caller);

        let key = Nat64.toText(postID) # "-" # principal;

        userPostVoteMap.put(key, userPostVote);

        let postActor = actor(postCanisterId) : PostModule.PostActor;
        let res : Result.Result<Post, Text> = await postActor.getPostById(postID);
        
        //sklian update number vote
        switch (res) {
          case (#ok(fetchedPost)) {
            let updatedPost : Post = fetchedPost;
            if (voteType == "up") {
                let newUpVote : Nat64 = updatedPost.numUpVotes + 1;
                let updateResult : Result.Result<Post, Text> = await postActor.updateUpvoteNum(postID,newUpVote);
                switch (updateResult) {
                    case (#ok(_)){
                        return #ok(userPostVote);
                    };
                    case (#err(updateErrorMessage)){
                        return #err("Failed to update comment count: " # updateErrorMessage);
                    };
                };
            } else if (voteType == "down") {
                let newDownVote : Nat64 = updatedPost.numDownVotes + 1;
                let updateResult : Result.Result<Post, Text> = await postActor.updateUpvoteNum(postID,newDownVote);
                switch (updateResult) {
                    case (#ok(_)){
                        return #ok(userPostVote);
                    };
                    case (#err(updateErrorMessage)){
                        return #err("Failed to update comment count: " # updateErrorMessage);
                    };
                };
            } else {
                return #err("Invalid vote type");
            };
          };
          case (#err(fetchErrorMessage)) {
            return #err("Failed to retrieve post: " # fetchErrorMessage);
          };
        };
    };

    //update type
    public shared ({caller}) func updateVoteType(postID : Nat64, voteType : Text, postCanisterId:Text) : async Result.Result<UserPostVote, Text> {
        let principal = Principal.toText(caller);
        let key = Nat64.toText(postID) # "-" # principal;

        switch (userPostVoteMap.get(key)) {
            case (?res) {
                let userPostVote : UserPostVote = res;

                let updatedUserPostVote = {
                    postID = userPostVote.postID;
                    userIdentity = userPostVote.userIdentity;
                    voteType = voteType;
                };

                userPostVoteMap.put(key, updatedUserPostVote);

                //sklian update number vote
                let postActor = actor(postCanisterId) : PostModule.PostActor;
                let result : Result.Result<Post, Text> = await postActor.getPostById(postID);
                
                //sklian update number vote
                switch (result) {
                    case (#ok(fetchedPost)) {
                        let updatedPost : Post = fetchedPost;
                        if (voteType == "up") {
                            let newUpVote : Nat64 = updatedPost.numUpVotes + 1;
                            let newDownVote : Nat64 = updatedPost.numDownVotes - 1;
                            let updateResult : Result.Result<Post, Text> = await postActor.updateUpvoteNum(postID,newUpVote);
                            let updateResult2 : Result.Result<Post, Text> = await postActor.updateDownvoteNum(postID,newDownVote);

                           switch (updateResult, updateResult2) {
                                case (#ok(_), #ok(_)) {
                                    return #ok(userPostVote);
                                };
                                case (#err(updateErrorMessage), _) {
                                    return #err("Failed to update upvote count: " # updateErrorMessage);
                                };
                                case (_, #err(updateErrorMessage)) {
                                    return #err("Failed to update downvote count: " # updateErrorMessage);
                                };
                            };
                        } else if (voteType == "down") {
                            let newDownVote : Nat64 = updatedPost.numDownVotes + 1;
                            let newUpVote : Nat64 = updatedPost.numUpVotes - 1;

                            let updateResult : Result.Result<Post, Text> = await postActor.updateUpvoteNum(postID,newUpVote);
                            let updateResult2 : Result.Result<Post, Text> = await postActor.updateDownvoteNum(postID,newDownVote);

                            switch (updateResult, updateResult2) {
                                    case (#ok(_), #ok(_)) {
                                        return #ok(userPostVote);
                                    };
                                    case (#err(updateErrorMessage), _) {
                                        return #err("Failed to update upvote count: " # updateErrorMessage);
                                    };
                                    case (_, #err(updateErrorMessage)) {
                                        return #err("Failed to update downvote count: " # updateErrorMessage);
                                    };
                                };
                        } else {
                            return #err("Invalid vote type");
                        };
                    };
                    case (#err(fetchErrorMessage)) {
                        return #err("Failed to retrieve post: " # fetchErrorMessage);
                    };
                };

                return #ok(updatedUserPostVote);
            };
            case null {
                return #err("Error, post vote not found");
            };

        };
    };

    //delete post vote
    public shared func deletePostVote(caller : Principal, postID : Nat64,  postCanisterId:Text) : async Result.Result<(), Text> {
        let principal = Principal.toText(caller);
        let key = Nat64.toText(postID) # "-" # principal;

        let vote = userPostVoteMap.get(key);
        switch (vote) {
            case null {
                return #err("Post vote not found");
            };
            case (?fetched_vote) {
                let f_vote : UserPostVote = fetched_vote;
                let voteType = f_vote.voteType;
                userPostVoteMap.delete(key);

                //sklian update number vote
                let postActor = actor(postCanisterId) : PostModule.PostActor;
                let result : Result.Result<Post, Text> = await postActor.getPostById(postID);
                        
                //sklian update number vote
                switch (result) {
                    case (#ok(fetchedPost)) {
                        let updatedPost : Post = fetchedPost;
                            if (voteType == "up") {
                                let newUpVote : Nat64 = updatedPost.numUpVotes - 1;
                                let updateResult : Result.Result<Post, Text> = await postActor.updateUpvoteNum(postID,newUpVote);
                                switch (updateResult) {
                                    case (#ok(_)) {
                                        return #ok();
                                    };
                                    case (#err(updateErrorMessage)) {
                                            return #err("Failed to update upvote count: " # updateErrorMessage);
                                    };
                                    
                                    };
                                } else if (voteType == "down") {
                                    let newDownVote : Nat64 = updatedPost.numDownVotes - 1;
                                    let updateResult : Result.Result<Post, Text> = await postActor.updateDownvoteNum(postID,newDownVote);

                                    switch (updateResult) {
                                            case (#ok(_)) {
                                                return #ok();
                                            };
                                            case (#err(updateErrorMessage)) {
                                                return #err("Failed to update upvote count: " # updateErrorMessage);
                                            };
                                        };
                                } else {
                                    return #err("Invalid vote type");
                                };
                            };
                            case (#err(fetchErrorMessage)) {
                                return #err("Failed to retrieve post: " # fetchErrorMessage);
                            };
                        };

                return #ok();
            };
        };
        
    };

    //get vote by post ID
    public shared ({caller}) func getVoteByPostID(postID : Nat64) : async Result.Result<UserPostVote, Text> {
        let principal = Principal.toText(caller);
        let key = Nat64.toText(postID) # "-" # principal;

        switch (userPostVoteMap.get(key)) {
            case (?res) {
                let userPostVote : UserPostVote = res;
                return #ok(userPostVote);
            };
            case null {
                return #err("Error, post vote not found");
            };
        };
    };

}