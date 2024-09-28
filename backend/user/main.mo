import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Types "types";

actor class UserMain() {
  stable var userEntries : [(Principal, Types.User)] = [];
  var userMap = TrieMap.fromEntries<Principal, Types.User>(userEntries.vals(), Principal.equal, Principal.hash);

  type User = Types.User;

  system func preupgrade() {
    userEntries := Iter.toArray(userMap.entries());
  };

  system func postupgrade() {
    userMap := TrieMap.fromEntries<Principal, Types.User>(userEntries.vals(), Principal.equal, Principal.hash);
  };

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
      numFollowers = 0;
      numFollowing = 0;
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
  public shared query func getUserByUsername(username : Text) : async Result.Result<User, Text> {
    for (user in userMap.vals()) {
      if (user.username == username) {
          return #ok(user);
        };
      };

      return #err("User not found");
  };

  public shared query func getUsers(usernameQuery : Text) : async [User] {
    var users = Buffer.Buffer<User>(0);
    
    for (user in userMap.vals()) {
      if (Text.contains(user.username, #text usernameQuery)) {
        users.add(user);
      };
    };
    
    return Buffer.toArray(users);
  };


  public shared ({ caller }) func updateUser(username : Text, email : Text, gender : Text, bio : Text, profileImage : Blob, bannerImage : Blob) : async Result.Result<(), Text> {

    switch (userMap.get(caller)) {
      case (?res) {
        let user : User = res;

        let updatedUserProfile : User = _createUserObject(caller, username, email, gender, bio, profileImage, bannerImage, user.numFollowers, user.numFollowing);

        Debug.print("--- Updated User Profile ---");
        Debug.print("Updated username: " # updatedUserProfile.username);
        Debug.print("Updated email: " # updatedUserProfile.email);
        Debug.print("Updated gender: " # updatedUserProfile.gender);
        Debug.print("Updated bio: " # updatedUserProfile.bio);
        Debug.print("Updated profile image size: " # Int.toText(Blob.toArray(updatedUserProfile.profileImage).size()));
        Debug.print("Updated banner image size: " # Int.toText(Blob.toArray(updatedUserProfile.bannerImage).size()));
        Debug.print("--- End of Updated User Profile ---");

        userMap.put(caller, updatedUserProfile);
        return #ok();
      };
      case null {

        return #err("Error: Caller not found.: " # Principal.toText(caller));
      };
    };
  };

  private func _createUserObject(internetIdentity : Principal, username : Text, email : Text, gender : Text, bio : Text, profileImage : Blob, bannerImage : Blob, numFollowers: Nat64, numFollowing:Nat64) : User {

    return {
      internetIdentity = internetIdentity;
      username = username;
      email = email;
      gender = gender;
      bio = bio;
      profileImage = profileImage;
      bannerImage = bannerImage;
      numFollowers = numFollowers;
      numFollowing = numFollowing;
    };
  };

};
