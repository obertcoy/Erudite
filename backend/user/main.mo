import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Types "types";

actor class UserMain() {
  type User = Types.User;
  //uses principas as key, the value is the rest of the user's data
  let userMap = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  //register function
  public shared ({ caller }) func registerUser(inputUser : User, userPrincipal : ?Principal) : async Result.Result<User, Text> {

    let principal = switch (userPrincipal) {
      case (?userPrincipal) {
        userPrincipal;
      };
      case (null) {
        caller;
      };
    };

    if (userMap.get(principal) != null) {
      return #err("User already exists");
    };

    for (user in userMap.vals()) {
      if (user.email == inputUser.email) {
        return #err("Email already exist");
      };
    };

    for (user in userMap.vals()) {
      if (user.username == inputUser.username) {
        return #err("Username already exist");
      };
    };

    userMap.put(principal, inputUser);
    return #ok(inputUser);
  };

  //get user
  public shared query ({ caller }) func getUser(userPrincipal : ?Principal) : async Result.Result<User, Text> {

    let principal = switch (userPrincipal) {
      case (?userPrincipal) {
        userPrincipal;
      };
      case (null) {
        caller;
      };
    };

    switch (userMap.get(principal)) {
      case null {
        return #err("User not found");
      };
      case (?fetched_user) {
        return #ok(fetched_user);
      };
    };

  };

  //get user by username
  public func getUserByUsername(username : ?Text) : async Result.Result<User, Text> {
    switch username {
      case null {
        return #err("Username is invalid");
      };
      case (?validUsername) {
        for (user in userMap.vals()) {
          if (user.username == validUsername) {
            return #ok(user);
          };
        };

        return #err("User not found");
      };
    };
  };

  public shared query ({ caller }) func updateUserProfile(username : Text, gender : Text, bio : Text, profileImage : Blob, bannerImage : Blob) : async Result.Result<(), Text> {
    switch (userMap.get(caller)) {
      case (?res) {
        let user : User = res;
        let updatedUserProfile : User = _createUserObject(caller, username, gender, bio, profileImage, bannerImage, user.email);

        userMap.put(caller, updatedUserProfile);
        return #ok();
      };
      case null {
        return #err("Error, current user not found: " # Principal.toText(caller));
      };
    };
  };

  private func _createUserObject(internetIdentity : Principal, username : Text, gender : Text, bio : Text, profileImage : Blob, bannerImage : Blob, email : Text) : User {
    return {
      internetIdentity = internetIdentity;
      username = username;
      gender = gender;
      bio = bio;
      profileImage = profileImage;
      bannerImage = bannerImage;
      email = email;
    };
  };

};
