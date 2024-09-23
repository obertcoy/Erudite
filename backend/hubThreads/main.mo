import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Types "types";

actor class HubThreads(){
    type HubThreads = Types.HubThreads;
    type HubThreadProfile = Types.HubThreadProfile;

    //principal + "-" + hubID ad key, userhubmembership as value
    let membershipData = HashMap.HashMap<Text, HubThreads>(0, Text.equal, Text.hash);

    //create hub threads
    public func createHubThreads(hubID : Nat64, threadID: Nat64): async Result.Result<HubThreads, Text>{
        let hubThread:HubThreads = {
            threadID = threadID;
            hubID = hubID;
        };

        let key = Nat64.toText(hubID) # "-" # Nat64.toText(threadID);

        membershipData.put(key, hubThread);

        return #ok(hubThread);

    };

    //get all thread by hub ID

    //get hub thread profile by principal
}