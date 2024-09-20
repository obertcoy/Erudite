import Principal "mo:base/Principal";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Types "types";

actor {
  type UserProfile = Types.UserProfile;
  let userProfiles = HashMap.HashMap<Principal, UserProfile>(0, Principal.equal, Principal.hash);

  public func createUserProfile(userPrincipal : Principal, userProfile : UserProfile) : async Result.Result<(), Text> {

    switch (userProfiles.get(userPrincipal)) {
      case (?_) {
        return #err("Error, user profile already created");
      };
      case null {
        userProfiles.put(userPrincipal, userProfile);
        return #ok();
      };
    };

  };

  public shared query ({ caller }) func getUserProfile(principal : ?Text) : async Result.Result<UserProfile, Text> {
    switch principal {
      case (?validPrincipal) {
        switch (userProfiles.get(Principal.fromText(validPrincipal))) {
          case (?data) {
            return #ok(data);
          };
          case null {
            return #err("User not found");
          };
        };
      };
      case null {
        switch (userProfiles.get(caller)) {
          case (?data) {
            return #ok(data);
          };
          case null {
            return #err("Error, current user not found: " # Principal.toText(caller));
          };
        };
      };
    };
  };

  public shared query ({ caller }) func updateUserProfile(username : Text, bio : Text, profileImage : ?Blob, bannerImage : ?Blob) : async Result.Result<(), Text> {
    switch (userProfiles.get(caller)) {
      case (?_) {

        let updatedUserProfile : UserProfile = _createUserProfileObject(caller, username, bio, profileImage, bannerImage);

        userProfiles.put(caller, updatedUserProfile);

        return #ok();
      };
      case null {
        return #err("Error, current user not found: " # Principal.toText(caller));

      };
    };
  };

  private func _createUserProfileObject(internetIdentity : Principal, username : Text, bio : Text, profileImage : ?Blob, bannerImage : ?Blob) : UserProfile {
    return {
      internetIdentity = internetIdentity;
      username = username;
      bio = bio;
      profileImage = profileImage;
      bannerImage = bannerImage;
    };
  };

};
