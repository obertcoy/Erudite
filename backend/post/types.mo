import Result "mo:base/Result";
import Text "mo:base/Text";
import HubType "../hub/types";
import UserType "../user/types";

module {
  public type Result<Ok, Err> = Result.Result<Ok, Err>;
  type User = UserType.User;
  type Hub = HubType.Hub;

  //post datatype
  public type Post = {
    postId : Nat64;
    postTitle : Text;
    postBody : Text;
    postImage : ?Blob;
    internetIdentity : Principal;
    numUpVotes : Nat64;
    numDownVotes : Nat64;
    numComments : Nat64;
  };

  public type DetailedPost = {
    post : Post;
    user : User;
    hub : Hub;

  };

};
