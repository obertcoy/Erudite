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

    Debug.print("Create Membership: " # Nat64.toText(hubId));

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
            let foundHub = await hubActor.getHubByID(hubId);

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

    let hubActor = actor (hubCanisterId) : HubModule.HubActor;
    let buffer = Buffer.Buffer<Hub>(0);

    for (membership in membershipMap.vals()) {
      if (membership.userIdentity == principal) {
        try {
          let hubResult = await hubActor.getHubByID(membership.hubId);
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
          case (?fetchedMembership) {
            let hubActor = actor (hubCanisterId) : HubModule.HubActor;
            let foundHub = await hubActor.getHubByID(hubId);
            switch (foundHub) {
              case (#ok(hub)) {

                let foundRoleInHub = Array.find<Role>(hub.hubRoles, func role { role.roleName == fetchedMembership.userRole });

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

  // get user memberships
  public shared query func getUserMemberships(userPrincipal : ?Text) : async Result.Result<[UserHubMembership], Text> {

    switch userPrincipal {
      case null {
        return #err("Principal is invalid");
      };
      case (?userPrincipal) {

        var buffer = Buffer.Buffer<UserHubMembership>(0);

        for (membership in membershipMap.vals()) {

          if (Principal.toText(membership.userIdentity) == userPrincipal) {

            Debug.print("Found membership: " # debug_show (membership.hubId));
            buffer.add(membership);
          };
        };

        let memberships = Buffer.toArray(buffer);

        return #ok(memberships);
      };
    };
  };

  public shared ({ caller }) func removeMembership(removedUserPrincipal : ?Text, hubId : Nat64, hubCanisterId : Text) : async Result.Result<(), Text> {

    switch (removedUserPrincipal) {
      case null {
        return #err("Error: User id required");
      };
      case (?removedUserPrincipal) {

        let internetIdentity = Principal.toText(caller);
        let hubIDRepresentation : Text = Nat64.toText(hubId);
        let key = internetIdentity # "-" # hubIDRepresentation;

        switch (membershipMap.get(key)) {
          case (?updater) {

            let hubActor = actor (hubCanisterId) : HubModule.HubActor;

            let updaterRoleResult : Result.Result<Role, Text> = await getMembershipRole(?updater.userIdentity, hubId, hubCanisterId);

            switch (updaterRoleResult) {
              case (#ok(role)) {

                if (role.permissions.canKickMember) {

                  let removeKey = removedUserPrincipal # "-" # hubIDRepresentation;

                  let _ = membershipMap.remove(removeKey);

                  return #ok();
                } else {
                  return #err("Failed: Insufficient permissions to update the user roles.");
                };
              };

              case (#err(err)) {
                return #err(err);
              };
            };
          };
          case null {
            return #err("Error: Membership not found");
          };

        };
      };
    };
  };

  //update role -> Admin, Moderator, Member
  public shared ({ caller }) func updateMembershipRole(userPrincipal : ?Text, newRole : Text, hubId : Nat64, hubCanisterId : Text) : async Result.Result<(), Text> {

    switch (userPrincipal) {
      case null {
        return #err("Error: User id required");
      };
      case (?userPrincipal) {

        let internetIdentity = Principal.toText(caller);
        let hubIDRepresentation : Text = Nat64.toText(hubId);
        let key = internetIdentity # "-" # hubIDRepresentation;

        switch (membershipMap.get(key)) {
          case (?updater) {

            let hubActor = actor (hubCanisterId) : HubModule.HubActor;

            let updaterRoleResult : Result.Result<Role, Text> = await getMembershipRole(?updater.userIdentity, hubId, hubCanisterId);

            switch (updaterRoleResult) {
              case (#ok(role)) {

                if (role.permissions.canCreateEditRoles) {

                  let updateKey = userPrincipal # "-" # hubIDRepresentation;

                  let membership : UserHubMembership = {
                    hubId = hubId;
                    userIdentity = Principal.fromText(userPrincipal);
                    userRole = newRole;
                  };

                  membershipMap.put(updateKey, membership);
                  return #ok();
                } else {
                  return #err("Failed: Insufficient permissions to update the user roles.");
                };
              };

              case (#err(err)) {
                return #err(err);
              };
            };
          };
          case null {
            return #err("Error: Membership not found");
          };

        };

      };
    };
  };

  //get all joined users by role
  public shared func getUsersInHubByRole(hubId : Nat64, role : Text, userCanisterId : Text) : async Result.Result<[User], Text> {
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
