import Types "types";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";

actor class UserPostVoteMain() {
    type UserPostVote = Types.UserPostVote;

    let userPostVoteMap = HashMap.HashMap<Text, UserPostVote>(0, Text.equal, Text.hash);
    
    //create user post vote
    public shared ({caller}) func createUserPostVote(postID : Nat64, voteType: Text):async Result.Result<UserPostVote, Text>{
        let userPostVote: UserPostVote = {
            postID = postID;
            userIdentity = caller;
            voteType = voteType;
        };

        let principal = Principal.toText(caller);

        let key = Nat64.toText(postID) # "-" # principal;

        userPostVoteMap.put(key, userPostVote);

        return #ok(userPostVote);
    };

    //update type
    public shared ({caller}) func updateVoteType(postID : Nat64, voteType : Text) : async Result.Result<UserPostVote, Text> {
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
                return #ok(updatedUserPostVote);
            };
            case null {
                return #err("Error, post vote not found");
            };
        };
    };

    //delete post vote
    public shared func deletePostVote(caller : Principal, postID : Nat64) : async Result.Result<(), Text> {

        let principal = Principal.toText(caller);
        let key = Nat64.toText(postID) # "-" # principal;

        userPostVoteMap.delete(key);

        return #ok();
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