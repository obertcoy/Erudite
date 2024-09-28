import Types "types";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Blob "mo:base/Blob";
import Nat64 "mo:base/Nat64";
import Nat32 "mo:base/Nat32";

import UserHubMembershipModule "../userHubMembership/interface";
import UserHubMembershipType "../userHubMembership/types";

actor class HubMain() {
  type Hub = Types.Hub;
  type UserHubMembership = UserHubMembershipType.UserHubMembership;
  type Role = Types.Role;
  type Rule = Types.Rule;
  type Permission = Types.Permission;

  private func _hash32(n : Nat64) : Nat32 {
    return Nat32.fromNat(Nat64.toNat(n));
  };

  let hubMap = TrieMap.TrieMap<Nat64, Hub>(Nat64.equal, _hash32);
  //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
  var counter : Nat64 = 10;

  //create hub
  public shared ({ caller }) func createHub(hubName : Text, hubDescription : Text, hubBannerImage : Blob, hubRules : [Rule], userHubMembershipCanisterId : Text) : async Result.Result<Hub, Text> {

    for (hub in hubMap.vals()) {
      if (hub.hubName == hubName) {
        return #err("Failed: Hub name already exist");
      };
    };

    // Default roles

    let ownerPermissions : Permission = {
      canDeletePost = true;
      canEditHub = true;
      canCreateEditRoles = true;
      canKickMember = true;
    };

    let ownerRole : Role = {

      roleName = "Owner";
      permissions = ownerPermissions;
      default = false;
    };

    let memberPermissions : Permission = {
      canDeletePost = false;
      canEditHub = false;
      canCreateEditRoles = false;
      canKickMember = false;
    };

    let memberRole : Role = {
      roleName = "Member";
      permissions = memberPermissions;
      default = true;
    };

    let hub : Hub = {
      hubID = counter;
      hubName = hubName;
      hubDescription = hubDescription;
      hubBannerImage = hubBannerImage;
      hubRoles = [ownerRole, memberRole];
      hubRules = hubRules;
    };

    //create membership -> admin
    let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;
    let result : Result.Result<UserHubMembership, Text> = await userHubMembershipActor.createMembership(?caller, counter, ownerRole.roleName, null);

    switch (result) {
      case (#ok(_)) {
        hubMap.put(counter, hub);
        counter += 1;
        return #ok(hub);
      };
      case (#err(errorMessage)) {
        return #err("Failed to create membership: " # errorMessage);
      };
    };
  };

  //edit hub
  public shared ({ caller }) func updateHubInformation(hubID : Nat64, hubDescription : Text, hubBannerImage : Blob, hubCanisterID : Text, userHubMembershipCanisterId : Text) : async Result.Result<(), Text> {
    switch (hubMap.get(hubID)) {
      case (?hub) {
        let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;
        let callerRoleResult : Result.Result<Role, Text> = await userHubMembershipActor.getMembershipRole(?caller, hubID, hubCanisterID);

        switch (callerRoleResult) {
          case (#ok(role)) {
            if (role.permissions.canEditHub) {
              let updatedHubProfile = _createHubObject(hub.hubID, hub.hubName, hubDescription, hubBannerImage, hub.hubRules, hub.hubRoles);

              hubMap.put(hubID, updatedHubProfile);
              return #ok();
            } else {
              return #err("Failed: Insufficient permissions to update the hub profile.");
            };
          };

          case (#err(err)) {
            return #err(err);
          };
        };
      };
      case null {
        return #err("Error: Hub not found");
      };
    };
  };

  public shared ({ caller }) func createEditHubRoles(hubID : Nat64, hubRoles : [Role], hubCanisterId : Text, userHubMembershipCanisterId : Text) : async Result.Result<(), Text> {

    switch (hubMap.get(hubID)) {
      case (?hub) {
        let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;
        let callerRoleResult : Result.Result<Role, Text> = await userHubMembershipActor.getMembershipRole(?caller, hubID, hubCanisterId);

        switch (callerRoleResult) {
          case (#ok(role)) {

            if (role.permissions.canCreateEditRoles) {
              let updatedHubProfile = _createHubObject(hub.hubID, hub.hubName, hub.hubDescription, hub.hubBannerImage, hub.hubRules, hubRoles);

              hubMap.put(hubID, updatedHubProfile);
              return #ok();
            } else {
              return #err("Failed: Insufficient permissions to update the hub roles.");
            };
          };

          case (#err(err)) {
            return #err(err);
          };
        };
      };
      case null {
        return #err("Error: Hub not found");
      };
    };
  };

  private func _createHubObject(hubID : Nat64, hubName : Text, hubDescription : Text, hubBannerImage : Blob, hubRules : [Rule], hubRoles : [Role]) : Hub {
    return {
      hubID = hubID;
      hubName = hubName;
      hubDescription = hubDescription;
      hubBannerImage = hubBannerImage;
      hubRules = hubRules;
      hubRoles = hubRoles;
    };
  };

  //get hub by Name
  public shared query func getHubByName(hubName : Text) : async Result.Result<Hub, Text> {

    for (hub in hubMap.vals()) {
      if (hub.hubName == hubName) {
        return #ok(hub);
      };
    };

    return #err("Error: Hub not found");

  };

  //get hub by ID
  public shared query func getHubByID(hubID : Nat64) : async Result.Result<Hub, Text> {
    switch (hubMap.get(hubID)) {
      case null {
        return #err("Hub not found");
      };
      case (?fetched_hub) {
        return #ok(fetched_hub);
      };
    };
    return #err("Hub not found");
  };

  //get all hub
  public shared query func getAllHubs() : async Result.Result<[Hub], Text> {
    var buffer = Buffer.Buffer<Hub>(0);
    for (hub in hubMap.vals()) {
      buffer.add(hub);
    };
    return #ok(Buffer.toArray(buffer));
  };

};
