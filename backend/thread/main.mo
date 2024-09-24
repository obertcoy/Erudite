import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";

import HubThreadsModule "../hubThreads/interface";
import HubThreadsType "../hubThreads/types";
actor class ThreadMain(){
    type Thread = Types.Thread;
    type HubThreads = HubThreadsType.HubThreads;

    let threadData= TrieMap.TrieMap<Nat64, Thread>(Nat64.equal, Nat64.toNat32);
    //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
    var counter: Nat64 = 10;

    //create thread
    public shared({caller}) func createThread(threadBody: Text, threadImage: ?Blob, hubID: Nat64, hubThreadsCanisterId : Text): async Result.Result<Thread, Text>{
        let thread: Thread = createThreadObject(counter, threadBody, threadImage, caller, 0,0,0);
        threadData.put(counter, thread);

        //sklian create relationship
        let hubThreadsActor = actor (hubThreadsCanisterId) : HubThreadsModule.HubThreadsActor;
        let result: Result.Result<HubThreads, Text> = await hubThreadsActor.createHubThreads(hubID, counter);
        switch (result) {
            case (#ok(_)){
                counter += 1;
                return #ok(thread);
            };
            case (#err(errorMessage)){
                return #err("Failed to create thread: " # errorMessage);
            };
        };
    };

    private func createThreadObject(threadID: Nat64, threadBody: Text, threadImage: ?Blob, creatorIdentity: Principal, numUpVotes:Nat64, numDownVotes:Nat64, numComments:Nat64) : Thread {
        return {
            threadID = threadID;
            threadBody = threadBody;
            threadImage = threadImage;
            internetIdentity = creatorIdentity;
            numUpVotes = numUpVotes;
            numDownVotes= numDownVotes;
            numComments = numComments;
        };
    };

    //get all thread
    public func getAllThread():async Result.Result<[Thread], Text>{
        var buffer = Buffer.Buffer<Thread>(0);
        for (thread in threadData.vals()) {
            buffer.add(thread);
        };
        return #ok(Buffer.toArray(buffer));
    };


    //get thread by ID
    public func getThreadByID(threadID:?Nat64):async Result.Result<Thread, Text>{
        switch threadID {
            case null {
                return #err("Thread ID is invalid");
            };
            case (?validThreadID) {
                switch (threadData.get(validThreadID)) {
                    case null {
                        return #err("Thread not found");
                    };
                    case (?fetched_thread) {
                        return #ok(fetched_thread);
                    };
                };
                return #err("Thread not found");
            };
        };
    };

    //get thread by internet identity -> get thread by user
    public func getThreadByPrincipal(principal : ?Principal):async Result.Result<[Thread], Text>{
        switch principal {
            case null {
                return #err("Principal ID is invalid");
            };
            case (?validPrincipal) {
                var buffer = Buffer.Buffer<Thread>(0);
                for (thread in threadData.vals()) {
                    if (thread.internetIdentity == validPrincipal) {
                        buffer.add(thread);
                    };
                };
                return #ok(Buffer.toArray(buffer));
            };
        };
    };

    //update upvote num
    public func updateUpvoteNum(threadID: Nat64, upvoteNum: Nat64):async Result.Result<Thread, Text>{
        switch(threadData.get(threadID)){
            case(?res){
                let thread: Thread = res;

                let updatedThread = {
                    threadID = thread.threadID;
                    threadBody = thread.threadBody;
                    threadImage = thread.threadImage;
                    internetIdentity = thread.internetIdentity;
                    numUpVotes = upvoteNum;
                    numDownVotes = thread.numDownVotes;
                    numComments = thread.numComments;
                };

                threadData.put(updatedThread.threadID, updatedThread);
                return #ok(updatedThread);
            };
            case null{
                return #err("Error, thread not found" );
            }
        }
    };
    //update downvote num
    public func updateDownvoteNum(threadID: Nat64, downvoteNum: Nat64):async Result.Result<Thread, Text>{
        switch(threadData.get(threadID)){
            case(?res){
                let thread: Thread = res;

                let updatedThread = {
                    threadID = thread.threadID;
                    threadBody = thread.threadBody;
                    threadImage = thread.threadImage;
                    internetIdentity = thread.internetIdentity;
                    numUpVotes = thread.numUpVotes;
                    numDownVotes = downvoteNum;
                    numComments = thread.numComments;
                };

                threadData.put(updatedThread.threadID, updatedThread);
                return #ok(updatedThread);
            };
            case null{
                return #err("Error, thread not found" );
            }
        }
    };

    //update comment num
    public func updateCommentNum(threadID: Nat64, commentNum: Nat64):async Result.Result<Thread, Text>{
        switch(threadData.get(threadID)){
            case(?res){
                let thread: Thread = res;

                let updatedThread = {
                    threadID = thread.threadID;
                    threadBody = thread.threadBody;
                    threadImage = thread.threadImage;
                    internetIdentity = thread.internetIdentity;
                    numUpVotes = thread.numUpVotes;
                    numDownVotes = thread.numDownVotes;
                    numComments = commentNum;
                };

                threadData.put(updatedThread.threadID, updatedThread);
                return #ok(updatedThread);
            };
            case null{
                return #err("Error, thread not found" );
            }
        }
    };
}

