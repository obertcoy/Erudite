import Types "types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Nat64 "mo:base/Nat64";
import Array "mo:base/Array";

import UserModule "../user/interface";
import UserType "../user/types";
import HubModule "../hub/interface";
import HubType "../hub/types";

actor class UserHubMembershipMain() {
  type User = UserType.User;
  type UserHubMembership = Types.UserHubMembership;
  type Hub = HubType.Hub;
  type Role = HubType.Role;

  //principal + "-" + hubID ad key, userhubmembership as value
  let membershipMap = HashMap.HashMap<Text, UserHubMembership>(0, Text.equal, Text.hash);

  //create membership
  public shared ({ caller }) func createMembership(hubID : Nat64, membershipType : Text) : async Result.Result<UserHubMembership, Text> {
    let internetIdentity = Principal.toText(caller);
    let hubIDRepresentation : Text = Nat64.toText(hubID);
    let key = internetIdentity # "-" # hubIDRepresentation;
    if (membershipMap.get(key) != null) {
      return #err("Membership already exists");
    };

    let membership : UserHubMembership = {
      hubID = hubID;
      userIdentity = caller;
      userRole = membershipType;
    };

    membershipMap.put(key, membership);

    return #ok(membership);
  };

  //get all joined hub
  public shared query func getMembership(principal : ?Principal) : async Result.Result<[UserHubMembership], Text> {
    switch principal {
      case null {
        return #err("Principal is invalid");
      };
      case (?validPrincipal) {
        var buffer = Buffer.Buffer<UserHubMembership>(0);
        for (membership in membershipMap.vals()) {
          if (membership.userIdentity == validPrincipal) {
            buffer.add(membership);
          };
        };
        let matchingMemberships = Buffer.toArray(buffer);

        return #ok(matchingMemberships);
      };
    };
  };

  //get hub role
  public shared func getMembershipRole(principal : ?Principal, hubID : Nat64, hubCanisterId : Text) : async Result.Result<Role, Text> {
    switch principal {
      case null {
        return #err("Principal is invalid");
      };
      case (?validPrincipal) {
        let internetIdentity = Principal.toText(validPrincipal);
        let hubIDRepresentation : Text = Nat64.toText(hubID);
        let key = internetIdentity # "-" # hubIDRepresentation;
        switch (membershipMap.get(key)) {
          case null {
            return #err("Error: User not found while getting hub role");
          };
          case (?fetched_membership) {
            let hubActor = actor (hubCanisterId) : HubModule.HubActor;
            let foundHub = await hubActor.getHubByID(?hubID);
            switch (foundHub) {
              case (#ok(hub)) {

                let foundRoleInHub = Array.find<Role>(hub.hubRoles, func role { role.roleName == fetched_membership.userRole });

                switch (foundRoleInHub) {
                  case (?role) {
                    return #ok(role);
                  };
                  case null {
                    return #err("Error: User role is not in hub roles");
                  };
                };
              };
              case (#err(errorMessage)) {
                return #err(errorMessage);
              };
            };

          };
        };
      };
    };
  };

  //update role -> Admin, Moderator, Member
  public shared func updateRole(username : ?Text, newRole : Text, hubID : Nat64, userCanisterId : Text) : async Result.Result<Text, Text> {
    let userActor = actor (userCanisterId) : UserModule.UserActor;
    let result : Result.Result<User, Text> = await userActor.getUserByUsername(username);

    switch (result) {
      case (#ok(user)) {
        let userIdentity = user.internetIdentity;
        let internetIdentity = Principal.toText(userIdentity);
        let hubIDRepresentation : Text = Nat64.toText(hubID);
        let key = internetIdentity # "-" # hubIDRepresentation;

        let membership : UserHubMembership = {
          hubID = hubID;
          userIdentity = userIdentity;
          userRole = newRole;
        };

        membershipMap.put(key, membership);

        return #ok("Role updated successfully");
      };
      case (#err(errorMessage)) {
        return #err(errorMessage);
      };
    };
  };

  //get all joined users by role
  public shared func getUserHubByRole(hubID : Nat64, role : Text, userCanisterId : Text) : async Result.Result<[User], Text> {
    var buffer = Buffer.Buffer<User>(0);
    let userActor = actor (userCanisterId) : UserModule.UserActor;

    for (membership in membershipMap.vals()) {
      if (membership.hubID == hubID and membership.userRole == role) {
        let userIdentityOptional : ?Text = ?Principal.toText(membership.userIdentity);
        let result : Result.Result<User, Text> = await userActor.getUser(userIdentityOptional);
        switch (result) {
          case (#ok(user)) {
            buffer.add(user);
          };
          case (#err(_)) {};
        };
      };
    };

    let users = Buffer.toArray(buffer);
    return #ok(users);
  };
};
