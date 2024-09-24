import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Blob "mo:base/Blob";
import Array "mo:base/Array";

import UserHubMembershipModule "../userHubMembership/interface";
import UserHubMembershipType "../userHubMembership/types";

actor class HubMain() {
  type Hub = Types.Hub;
  type UserHubMembership = UserHubMembershipType.UserHubMembership;
  type Role = Types.Role;
  type Permission = Types.Permission;
  let hubMap = TrieMap.TrieMap<Nat64, Hub>(Nat64.equal, Nat64.toNat32);
  //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
  var counter : Nat64 = 10;

  //create hub
  public shared ({ caller }) func createHub(hubName : Text, userHubMembershipCanisterId : Text) : async Result.Result<Hub, Text> {
    for (hub in hubMap.vals()) {
      if (hub.hubName == hubName) {
        return #err("Hub name already exist");
      };
    };

    let ownerPermissions : Permission = {
      canDeletePost = true;
      canEditHub = true;
      canCreateEditRoles = true;
      canKickMember = true;
    };

    let ownerRole : Role = {

      roleName = "Owner";
      permissions = ownerPermissions;

    };
    let emptyBlob : Blob = Blob.fromArray([]);

    let hub : Hub = {
      hubID = counter;
      hubName = hubName;
      hubDescription = "";
      hubProfileImage = emptyBlob;
      hubBannerImage = emptyBlob;
      hubRoles = [ownerRole];
    };
    hubMap.put(counter, hub);

    //create membership -> admin
    let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;
    let result : Result.Result<UserHubMembership, Text> = await userHubMembershipActor.createMembership(counter, "Owner");
    switch (result) {
      case (#ok(_)) {
        counter += 1;
        return #ok(hub);
      };
      case (#err(errorMessage)) {
        return #err("Failed to create membership: " # errorMessage);
      };
    };
  };

  //edit hub
  public shared ({ caller }) func updateHubProfile(hubID : Nat64, hubDescription : Text, hubProfileImage : Blob, hubBannerImage : Blob, hubCanisterID : Text, userHubMembershipCanisterId : Text) : async Result.Result<(), Text> {
    switch (hubMap.get(hubID)) {
      case (?hub) {
        let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;
        let callerRoleResult : Result.Result<Role, Text> = await userHubMembershipActor.getMembershipRole(?caller, hubID, hubCanisterID);

        switch (callerRoleResult) {
          case (#ok(role)) {
            if (role.permissions.canEditHub) {
              let updatedHubProfile = _createHubObject(hub.hubID, hub.hubName, hubDescription, hubProfileImage, hubBannerImage, hub.hubRoles);

              hubMap.put(hubID, updatedHubProfile);
              return #ok();
            } else {
              return #err("Error: Insufficient permissions to update the hub profile.");
            };
          };

          case (#err(err)) {
            return #err(err);
          };
        };
      };
      case null {
        return #err("Error: hub not found");
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
              let updatedHubProfile = _createHubObject(hub.hubID, hub.hubName, hub.hubDescription, hub.hubProfileImage, hub.hubBannerImage, hub.hubRoles);

              hubMap.put(hubID, updatedHubProfile);
              return #ok();
            } else {
              return #err("Error: Insufficient permissions to update the hub roles.");
            };
          };

          case (#err(err)) {
            return #err(err);
          };
        };
      };
      case null {
        return #err("Error: hub not found");
      };
    };
  };

  private func _createHubObject(hubID : Nat64, hubName : Text, hubDescription : Text, hubProfileImage : Blob, hubBannerImage : Blob, hubRoles : [Role]) : Hub {
    return {
      hubID = hubID;
      hubName = hubName;
      hubDescription = hubDescription;
      hubProfileImage = hubProfileImage;
      hubBannerImage = hubBannerImage;
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

    return #err("User not found");

  };

  //get hub by ID
  public shared query func getHubByID(hubID : ?Nat64) : async Result.Result<Hub, Text> {
    switch hubID {
      case null {
        return #err("Hub ID is invalid");
      };
      case (?validHubID) {
        switch (hubMap.get(validHubID)) {
          case null {
            return #err("Hub not found");
          };
          case (?fetched_hub) {
            return #ok(fetched_hub);
          };
        };
        return #err("Hub not found");
      };
    };
  };

  //get all hub
  public func getAllHub() : async Result.Result<[Hub], Text> {
    var buffer = Buffer.Buffer<Hub>(0);
    for (hub in hubMap.vals()) {
      buffer.add(hub);
    };
    return #ok(Buffer.toArray(buffer));
  };

};
