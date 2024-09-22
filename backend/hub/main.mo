import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";

import UserHubMembershipModule "../userHubMembership/interface";
import UserHubMembershipType "../userHubMembership/types";

actor class HubMain(){
    type Hub = Types.Hub;
    type UserHubMembership = UserHubMembershipType.UserHubMembership;
    let hubData= TrieMap.TrieMap<Nat64, Hub>(Nat64.equal, Nat64.toNat32);
    //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
    var counter: Nat64 = 10;

    public shared({caller}) func createHub(hubName: Text, userHubMembershipCanisterId: Text): async Result.Result<Hub, Text>{
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

}