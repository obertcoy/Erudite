import Types "types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Nat64 "mo:base/Nat64";
import Array "mo:base/Array";
import Error "mo:base/Error";
import Debug "mo:base/Debug";

import UserModule "../user/interface";
import UserType "../user/types";
import HubModule "../hub/interface";
import HubType "../hub/types";

actor class UserHubMembershipMain() {
  type User = UserType.User;
  type UserHubMembership = Types.UserHubMembership;
  type Hub = HubType.Hub;
  type Role = HubType.Role;

  //principal + "-" + hubId ad key, userhubmembership as value
  let membershipMap = HashMap.HashMap<Text, UserHubMembership>(0, Text.equal, Text.hash);

  //create membership
  public shared ({ caller }) func createMembership(
    owner : ?Principal,
    hubId : Nat64,
    ownerRole : ?Text,
    hubCanisterId : ?Text,
  ) : async Result.Result<UserHubMembership, Text> {

    let internetIdentity = switch (owner) {
      case (?owner) {
        Principal.toText(owner);
      };
      case null {
        Principal.toText(caller);
      };
    };

    let hubIDRepresentation : Text = Nat64.toText(hubId);
    let key = internetIdentity # "-" # hubIDRepresentation;

    // Check if membership already exists
    if (membershipMap.get(key) != null) {
      return #err("Error: Membership already exists");
    };

    let roleName = switch (ownerRole) {
      case (?role) {
        role; // If ownerRole is provided, use it
      };
      case null {
        // If ownerRole is not provided, fetch the default role from the hub
        switch (hubCanisterId) {
          case (?hubCanisterId) {
            let hubActor = actor (hubCanisterId) : HubModule.HubActor;
            let foundHub = await hubActor.getHubByID(?hubId);

            switch (foundHub) {
              case (#ok(foundHub)) {
                var defaultRole : ?Text = null;

                // Look for the default role in the hub's roles
                for (role in foundHub.hubRoles.vals()) {
                  if (role.default) {
                    defaultRole := ?role.roleName;
                  };
                };

                // Check if a default role was found
                switch (defaultRole) {
                  case (?role) {
                    role; // Use the default role if found
                  };
                  case null {
                    return #err("Error: No default role found in the hub");
                  };
                };
              };
              case (#err(err)) {
                return #err(err);
              };
            };
          };
          case null {
            return #err("Error: Hub canister ID needs to be provided to fetch default role");
          };
        };
      };
    };

    // Create the membership
    let membership : UserHubMembership = {
      hubId = hubId;
      userIdentity = Principal.fromText(internetIdentity);
      userRole = roleName;
    };

    Debug.print("hub userIdentity: " # internetIdentity);

    // Store the membership in the membership map
    membershipMap.put(key, membership);

    return #ok(membership);
  };

  //get all joined hub
  public shared ({ caller }) func getJoinedHubs(userPrincipal : ?Text, hubCanisterId : Text) : async Result.Result<[Hub], Text> {

    let principal = switch (userPrincipal) {
      case (?userPrincipal) {
        Principal.fromText(userPrincipal);
      };
      case null {
        caller;
      };
    };

    Debug.print("Determined principal: " # Principal.toText(principal));
    Debug.print("hubCanisterId: " # hubCanisterId);

    let hubActor = actor (hubCanisterId) : HubModule.HubActor;
    let buffer = Buffer.Buffer<Hub>(0);

    for (membership in membershipMap.vals()) {
      if (membership.userIdentity == principal) {
        try {
          let hubResult = await hubActor.getHubByID(?membership.hubId);
          switch (hubResult) {
            case (#ok(foundHub)) {
                Debug.print("found hub: " # foundHub.hubName);
              buffer.add(foundHub);
            };
            case (#err(_)) {};
          };
        } catch (e) {
          // Handle any errors that occur during the async call
          return #err("Error fetching hub: " # Error.message(e));
        };
      };
    };

    let matchingHubs = Buffer.toArray(buffer);
    return #ok(matchingHubs);
  };

  //get hub role
  public shared func getMembershipRole(principal : ?Principal, hubId : Nat64, hubCanisterId : Text) : async Result.Result<Role, Text> {
    switch principal {
      case null {
        return #err("Principal is invalid");
      };
      case (?validPrincipal) {
        let internetIdentity = Principal.toText(validPrincipal);
        let hubIDRepresentation : Text = Nat64.toText(hubId);
        let key = internetIdentity # "-" # hubIDRepresentation;
        switch (membershipMap.get(key)) {
          case null {
            return #err("Error: User not found while getting hub role");
          };
          case (?fetched_membership) {
            let hubActor = actor (hubCanisterId) : HubModule.HubActor;
            let foundHub = await hubActor.getHubByID(?hubId);
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
  public shared func updateRole(username : ?Text, newRole : Text, hubId : Nat64, userCanisterId : Text) : async Result.Result<Text, Text> {
    let userActor = actor (userCanisterId) : UserModule.UserActor;
    let result : Result.Result<User, Text> = await userActor.getUserByUsername(username);

    switch (result) {
      case (#ok(user)) {
        let userIdentity = user.internetIdentity;
        let internetIdentity = Principal.toText(userIdentity);
        let hubIDRepresentation : Text = Nat64.toText(hubId);
        let key = internetIdentity # "-" # hubIDRepresentation;

        let membership : UserHubMembership = {
          hubId = hubId;
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
  public shared func getUserHubByRole(hubId : Nat64, role : Text, userCanisterId : Text) : async Result.Result<[User], Text> {
    var buffer = Buffer.Buffer<User>(0);
    let userActor = actor (userCanisterId) : UserModule.UserActor;

    for (membership in membershipMap.vals()) {
      if (membership.hubId == hubId and membership.userRole == role) {
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
