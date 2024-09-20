import Result "mo:base/Result";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type UserProfile = {
      internetIdentity : Principal;
      username : Text;
      bio: Text;
      profileImage: ?Blob;
      bannerImage: ?Blob;
   };

};