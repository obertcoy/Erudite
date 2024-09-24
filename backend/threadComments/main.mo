import Types "types";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";

actor class ThreadComments(){
    type ThreadComments = Types.ThreadComments;
    type ThreadCommentsProfile = Types.ThreadCommentsProfile;

    //threadID + "-" + commentID
    let threadCommentsData = HashMap.HashMap<Text, ThreadComments>(0, Text.equal, Text.hash);

    //create thread comments
    public shared ({caller}) func createThreadComments(threadID : Nat64, commentID: Nat64):async Result.Result<ThreadComments, Text>{
        let threadComment: ThreadComments = {
            threadID = threadID;
            commentID = commentID;
        };

        let key = Nat64.toText(threadID) # "-" # Nat64.toText(commentID);

        threadCommentsData.put(key, threadComment);

        return #ok(threadComment);
    };

    //get all comment by thread id

    //get thread comment profile by principal
}