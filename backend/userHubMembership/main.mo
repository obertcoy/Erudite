import Types "types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";

import UserModule "../user/interface";
import UserType "../user/types";

actor class UserHubMembershipMain(){
    type User = UserType.User;
    type UserHubMembership = Types.UserHubMembership;

    //principal + "-" + hubID ad key, userhubmembership as value
    let membershipData = HashMap.HashMap<Text, UserHubMembership>(0, Text.equal, Text.hash);

    //create membership
    public shared({caller}) func createMembership(hubID: Text, membershipType: Text): async Result.Result<UserHubMembership, Text>{
        let internetIdentity = Principal.toText(caller);  
        let key = internetIdentity # "-" # hubID;   
        if(membershipData.get(key) != null){
            return #err("Membership already exists");
        };

        let membership : UserHubMembership = {
            hubID = hubID;
            userIdentity = caller;
            userRole = membershipType;
        };

        membershipData.put(key, membership);

        return #ok(membership);
    };

    //get all joined hub
    public func getMembership(principal : ?Principal):async Result.Result<[UserHubMembership], Text>{
        switch principal {
        case null {
            return #err("Principal is invalid");
        };
        case (?validPrincipal) {
            var buffer = Buffer.Buffer<UserHubMembership>(0);
            for (membership in membershipData.vals() ){
                if (membership.userIdentity == validPrincipal) {
                    buffer.add(membership);
                }
            };
            let matchingMemberships = Buffer.toArray(buffer);

            return #ok(matchingMemberships);
        };
        };
    };

    //get hub role
    public func getMembershipRole(principal : ?Principal, hubID : Text):async  Result.Result<Text, Text>{
        switch principal {
            case null {
                return #err("Principal is invalid");
            };
            case (?validPrincipal) {
              let internetIdentity = Principal.toText(validPrincipal);  
              let key = internetIdentity # "-" # hubID;             
                switch (membershipData.get(key)) {
                    case null {
                        return #err("User not found");
                    };
                    case (?fetched_membership) {
                        return #ok(fetched_membership.userRole);
                    };
                };
            };
        };
    };

    //update role
    public func updateRole(username : ?Text, newRole: Text, hubID:Text, userCanisterId: Text):async Result.Result<Text, Text>{
        let userActor = actor (userCanisterId) : UserModule.UserActor;
        let result : Result.Result<User, Text> = await userActor.getUserByUsername(username);

        switch (result) {
            case (#ok(user)) {  
                let userIdentity = user.internetIdentity; 
                let internetIdentity = Principal.toText(userIdentity);  
                let key = internetIdentity # "-" # hubID; 

                 let membership : UserHubMembership = {
                    hubID = hubID;
                    userIdentity = userIdentity;
                    userRole = newRole;
                };

                membershipData.put(key, membership);

                return #ok("Role updated successfully");
            };
            case (#err(errorMessage)) {
                return #err(errorMessage); 
            };
        };
    };

    //get all joined users by role
    public func getUserHubByRole(hubID: Text, role: Text, userCanisterId: Text): async Result.Result<[User], Text> {
        var buffer = Buffer.Buffer<User>(0);
        let userActor = actor (userCanisterId) : UserModule.UserActor;

        for (membership in membershipData.vals()) {
            if (membership.hubID == hubID and membership.userRole == role) {
                let userIdentityOptional : ?Text = ?Principal.toText(membership.userIdentity);
                let result: Result.Result<User, Text> = await userActor.getUser(userIdentityOptional);
                switch (result) {
                    case (#ok(user)) {
                        buffer.add(user); 
                    };
                    case (#err(_)) {
                    };
                };
            };
        };

        let users = Buffer.toArray(buffer); 
        return #ok(users); 
    };
}