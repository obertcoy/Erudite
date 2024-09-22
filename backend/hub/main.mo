import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";

import UserHubMembershipModule "../userHubMembership/interface";
import UserHubMembershipType "../userHubMembership/types";

actor class HubMain(){
    type Hub = Types.Hub;
    type UserHubMembership = UserHubMembershipType.UserHubMembership;
    let hubData= TrieMap.TrieMap<Nat64, Hub>(Nat64.equal, Nat64.toNat32);
    //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
    var counter: Nat64 = 10;

    //create hub
    public shared({caller}) func createHub(hubName: Text, userHubMembershipCanisterId: Text): async Result.Result<Hub, Text>{
        for (hub in hubData.vals()) {
            if (hub.hubName == hubName) {
                return #err("Hub name already exist");
            };
        };

        let hub:Hub = {
            hubID = counter;
            hubName = hubName;
            hubDescription = "";
            hubProfile = null;
            hubBanner = null;
        };
        hubData.put(counter, hub);

        //create membership -> admin
        let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;
        let result: Result.Result<UserHubMembership, Text> = await userHubMembershipActor.createMembership(counter, "Admin");
        switch (result) {
            case (#ok(_)){
                counter += 1;
                return #ok(hub);
            };
            case (#err(errorMessage)){
                return #err("Failed to create membership: " # errorMessage);
            };
        };
    };

    //edit hub
    public shared({caller}) func updateHubProfile(hubID:Nat64, hubDescription : Text, hubProfile : ?Blob, hubBanner : ?Blob, userHubMembershipCanisterId:Text): async Result.Result<(), Text> {
        switch (hubData.get(hubID)) {
        case (?res) {
            let userHubMembershipActor = actor (userHubMembershipCanisterId) : UserHubMembershipModule.UserHubMembershipActor;
            let result: Result.Result<Text, Text> = await userHubMembershipActor.getMembershipRole(?caller, hubID);
            switch (result) {
                case (#ok(role)) {
                    if (role == "Admin" or role == "Moderator") {
                        let hub: Hub = res;
                        let updatedHubProfile: Hub = _createHubObject(hubID, hub.hubName, hubDescription, hubProfile, hubBanner);

                        hubData.put(hubID, updatedHubProfile);
                        return #ok(); 
                    } else {
                        return #err("Error: Insufficient permissions to update the hub profile.");
                    }
                };
                case (#err(errorMessage)) {
                    return #err("Failed to get membership role: " # errorMessage);
                };
            };
        };
        case null {
            return #err("Error, hub not found" );
        };
        };
    };

    private func _createHubObject(hubID: Nat64, hubName: Text, hubDescription: Text, hubProfile:?Blob, hubBanner:?Blob) : Hub {
        return {
            hubID = hubID;
            hubName = hubName;
            hubDescription = hubDescription;
            hubProfile = hubProfile;
            hubBanner = hubBanner;
        };
    };

    //get hub by Name
    public func getHubByName(hubName:?Text):async Result.Result<Hub, Text>{
        switch hubName {
            case null {
                return #err("Hub name is invalid");
            };
            case (?validHubName) {
                for (hub in hubData.vals()) {
                    if (hub.hubName == hubName) {
                        return #ok(hub);
                    };
                };

                return #err("User not found");
            };
        };
    };

    //get hub by ID
    public func getHubByID(hubID:?Nat64):async Result.Result<Hub, Text>{
        switch hubID {
            case null {
                return #err("Hub ID is invalid");
            };
            case (?validHubID) {
                switch (hubData.get(validHubID)) {
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
    public func getAllHub():async Result.Result<[Hub], Text>{
        var buffer = Buffer.Buffer<Hub>(0);
        for (hub in hubData.vals()) {
            buffer.add(hub);
        };
        return #ok(Buffer.toArray(buffer));
    };

}