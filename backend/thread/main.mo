import Types "types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
actor class ThreadMain(){
    type Thread = Types.Thread;

    let threadData= TrieMap.TrieMap<Nat64, Thread>(Nat64.equal, Nat64.toNat32);
    //dibuat counternya mulai dari 10 karena nanti akan ada data seeding
    var counter: Nat64 = 10;

    //create thread
    public shared({caller}) func createThread(threadBody: Text, threadImage: ?Blob): async Result.Result<Thread, Text>{
        let thread: Thread = createThreadObject(counter, threadBody, threadImage, caller, 0,0,0);

        threadData.put(counter, thread);
        counter += 1;

        #ok(thread);
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
    public func getThreadByPrincipal(principal : ?Principal):async Result.Result<Thread, Text>{
        switch principal {
            case null {
                return #err("Principal ID is invalid");
            };
            case (?validPrincipal) {
                for (thread in threadData.vals()) {
                    if (thread.internetIdentity == validPrincipal) {
                        return #ok(thread);
                    };
                };
                return #err("Thread not found");
            };
        };
    };
}

