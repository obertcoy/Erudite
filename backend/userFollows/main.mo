import Types "types";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";

import UserModule "../user/interface";
import UserType "../user/types";

actor class UserFollowsMain() {
    type User = UserType.User;
    type UserFollows = Types.UserFollows;

    //principal + "-" + followedUser as key
    let userFollowsMap = HashMap.HashMap<Text, UserFollows>(0, Text.equal, Text.hash);

    //create user follows
    public shared ({caller}) func createUserFollows(followedUser: Principal):async Result.Result<UserFollows, Text>{
        
        let principal = Principal.toText(caller);
        let followedUserPrincipal = Principal.toText(followedUser);

        let key = principal # "-" # followedUserPrincipal;

        let userPostVote: UserFollows = {
            internetIdentity = caller;
            followedUser = followedUser;
        };

        userFollowsMap.put(key, userPostVote);

        //sklian update number followers

        return #ok(userPostVote);
    };


    //delete user follows
    public shared  ({caller}) func deleteUserFollows(followedUser : Principal) : async Result.Result<(), Text> {

        let principal = Principal.toText(caller);
        let followedUserPrincipal = Principal.toText(followedUser);

        let key = principal # "-" # followedUserPrincipal;

        userFollowsMap.delete(key);

        //sklian delet number followers

        return #ok();
    };

    //get following user
    public shared  ({caller}) func getFollowingUser(userCanisterId : Text) : async Result.Result<[User], Text> {
        let userActor = actor (userCanisterId) : UserModule.UserActor;
        var buffer = Buffer.Buffer<User>(0);
            for (userFollow in userFollowsMap.vals()) {
                if (userFollow.internetIdentity == caller) {
                    let result : Result.Result<User, Text> = await userActor.getUser(?Principal.toText(userFollow.followedUser));
                    switch (result) {
                        case (#ok(user)) {
                            buffer.add(user);
                        };
                        case (#err(_)) {
                        };
                    };
                };
            };
        return #ok(Buffer.toArray(buffer));
    };


    //get followers user
    public shared  ({caller}) func getFollowersUser(userCanisterId : Text) : async Result.Result<[User], Text> {
        let userActor = actor (userCanisterId) : UserModule.UserActor;
        var buffer = Buffer.Buffer<User>(0);
            for (userFollow in userFollowsMap.vals()) {
                if (userFollow.followedUser == caller) {
                    let result : Result.Result<User, Text> = await userActor.getUser(?Principal.toText(userFollow.internetIdentity));
                    switch (result) {
                        case (#ok(user)) {
                            buffer.add(user);
                        };
                        case (#err(_)) {
                        };
                    };
                };
            };
        return #ok(Buffer.toArray(buffer));
    };
}