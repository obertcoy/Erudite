import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Types "types";

actor class UserMain() {
  type User = Types.User;
  //uses principas as key, the value is the rest of the user's data
  let userData = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  //register function
  public shared ({caller}) func register(username : Text, email : Text, userProfileCanisterId: Text) : async Result.Result<User, Text> {

    let internetIdentity = caller;

    if (userData.get(internetIdentity) != null) {
      return #err("User already exists");
    };

    for (user in userData.vals()) {
      if (user.email == email) {
        return #err("Email already exist");
      };
    };

    for (user in userData.vals()) {
      if (user.username == username) {
        return #err("Username already exist");
      };
    };

    let user : User = {
      internetIdentity = internetIdentity;
      username = username;
      email = email;
      numJoinedHubs = 0;
      bio = "";
      profileImage = null;
      bannerImage = null;
    };

    userData.put(user.internetIdentity, user);
    return #ok(user);
  };

  //get user
  public func getUser(principal : ?Principal) : async Result.Result<User, Text> {
    switch principal {
      case null {
        return #err("Principal is invalid");
      };
      case (?validPrincipal) {
        switch (userData.get(validPrincipal)) {
          case null {
            return #err("User not found");
          };
          case (?fetched_user) {
            return #ok(fetched_user);
          };
        };
      };
    };
  };

  //get num of joined hub
  public func getNumJoinedHub(principal : ?Principal):async Result.Result<Nat, Text>{
    switch principal {
      case null {
        return #err("Principal is invalid");
      };
      case (?validPrincipal) {
        switch (userData.get(validPrincipal)) {
          case null {
            return #err("User not found");
          };
          case (?fetched_user) {
            return #ok(fetched_user.numJoinedHubs);
          };
        };
      };
    };
  };

  //get user by username
  public func getUserByUsername(username:?Text):async Result.Result<User, Text>{
    switch username {
      case null {
        return #err("Username is invalid");
      };
      case (?validUsername) {
        for (user in userData.vals()) {
          if (user.username == validUsername) {
            return #ok(user);
          };
        };

        return #err("User not found");
      };
    };
  };

public shared query ({ caller }) func updateUserProfile(username : Text, bio : Text, profileImage : ?Blob, bannerImage : ?Blob) : async Result.Result<(), Text> {
    switch (userData.get(caller)) {
      case (?res) {
        let user : User = res; 
        let updatedUserProfile : User = _createUserObject(caller, username, bio, profileImage, bannerImage, user.email, user.numJoinedHubs);

        userData.put(caller, updatedUserProfile);
        return #ok();
      };
      case null {
        return #err("Error, current user not found: " # Principal.toText(caller));
      };
    };
  };


  private func _createUserObject(internetIdentity : Principal, username : Text, bio : Text, profileImage : ?Blob, bannerImage : ?Blob, email: Text, numJoinedHub:Nat) : User {
    return {
      internetIdentity = internetIdentity;
      username = username;
      bio = bio;
      profileImage = profileImage;
      bannerImage = bannerImage;
      email = email;
      numJoinedHubs = numJoinedHub;
    };
  };


};
