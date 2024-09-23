import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Types "types";

actor class UserMain() {
  type User = Types.User;
  //uses principas as key, the value is the rest of the user's data
  let userMap = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  //register function
  public shared ({ caller }) func registerUser(username : Text, email : Text, gender : Text, userPrincipal : ?Principal) : async Result.Result<User, Text> {

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
      if (user.email == email) {
        return #err("Email already exist");
      };
    };

    for (user in userMap.vals()) {
      if (user.username == username) {
        return #err("Username already exist");
      };
    };
    let emptyBlob : Blob = Blob.fromArray([]);

    let newUser : User = {
      internetIdentity = principal;
      username = username;
      email = email;
      gender = gender;
      bio = "";
      profileImage = emptyBlob;
      bannerImage = emptyBlob;
    };

    userMap.put(principal, newUser);
    return #ok(newUser);
  };

  public shared query ({ caller }) func getUser(userPrincipal : ?Text, strictOpt : ?Bool) : async Result.Result<User, Text> {
    let strict = switch strictOpt {
      case (?s) s; // Use the passed value if provided
      case null false; // Default to false if not provided
    };

    let principal = switch (userPrincipal) {
      case (?validUserPrincipal) {
        Principal.fromText(validUserPrincipal);
      };
      case (null) {
        if (strict) {
          return #err("No Principal provided and strict mode is enabled.");
        } else {
          caller; 
        };
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
