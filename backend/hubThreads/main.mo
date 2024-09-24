import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Types "types";

import ThreadModule "../thread/interface";
import ThreadType "../thread/types";

import HubModule "../hub/interface";
import HubType "../hub/types";

actor class HubThreads(){
    type HubThreads = Types.HubThreads;
    type HubThreadProfile = Types.HubThreadProfile;
    type Thread = ThreadType.Thread;
    type Hub = HubType.Hub;
    

    //hubID + "-" + thread ID as key
    let hubThreadData = HashMap.HashMap<Text, HubThreads>(0, Text.equal, Text.hash);

    //create hub threads
    public func createHubThreads(hubID : Nat64, threadID: Nat64): async Result.Result<HubThreads, Text>{
        let hubThread:HubThreads = {
            threadID = threadID;
            hubID = hubID;
        };

        let key = Nat64.toText(hubID) # "-" # Nat64.toText(threadID);

        hubThreadData.put(key, hubThread);

        return #ok(hubThread);

    };

    //get all thread by hub ID
    public func getAllThreadByHubID(hubID : Nat64, threadCanisterId: Text): async Result.Result<[Thread], Text>{
        var buffer = Buffer.Buffer<Thread>(0);
        let threadActor = actor (threadCanisterId) : ThreadModule.ThreadActor;
        for (hubThread in hubThreadData.vals()){
            if(hubThread.hubID == hubID){
                let result: Result.Result<Thread, Text> = await threadActor.getThreadByID(?hubThread.threadID);
                switch (result) {
                    case (#ok(thread)) {
                        buffer.add(thread); 
                    };
                    case (#err(_)) {
                    };
                };
            };
        };

        return #ok(Buffer.toArray(buffer));
    };

    //get hub threads by thread id
    public func getHubThreadByThreadID(threadID : Nat64): async Result.Result<HubThreads, Text>{
        for (hubThread in hubThreadData.vals()){
            if(hubThread.threadID == threadID){
                return #ok(hubThread);
            };
        };

        return #err("Hub Thread not found");
    };

    //get hub thread profile by principal
    public shared ({caller}) func getAllThreadProfileByPrincipal(threadCanisterId: Text, hubCanisterId: Text) : async Result.Result<[HubThreadProfile], Text> {
        var buffer = Buffer.Buffer<HubThreadProfile>(0);
        let threadActor = actor (threadCanisterId) : ThreadModule.ThreadActor;
        let result: Result.Result<[Thread], Text> = await threadActor.getThreadByPrincipal(?caller);
        let hubActor = actor (hubCanisterId) : HubModule.HubActor;

        switch (result) {
            case (#ok(threads)) {  
                for (thread in threads.vals()) {
                    let hubThread : Result.Result<HubThreads, Text> = await getHubThreadByThreadID(thread.threadID);
                    switch (hubThread){
                        case(#ok(hubThread)){
                            let res: Result.Result<Hub, Text> = await hubActor.getHubByID(?hubThread.hubID);
                            switch (res) {
                                case (#ok(hub)) {
                                    let temp : HubThreadProfile = {
                                        threadID  = thread.threadID;
                                        threadBody = thread.threadBody;
                                        threadImage = thread.threadImage;
                                        internetIdentity = thread.internetIdentity;
                                        numUpVotes = thread.numUpVotes;
                                        numDownVotes = thread.numDownVotes;
                                        numComments = thread.numComments;
                                        hubID = hub.hubID;
                                        hubName = hub.hubName;
                                    };
                                    buffer.add(temp);
                                };
                                case (#err(_)) {
                                };
                            }
                        };
                        case(#err(_)){
                        };
                    };
                };
                return #ok(Buffer.toArray(buffer));
            };
            case (#err(errorMessage)) {
                return #err(errorMessage);
            };
        };
    };

}