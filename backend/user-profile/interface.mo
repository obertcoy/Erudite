import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Types "./types";

module {

    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type UserProfile = Types.UserProfile;

    public type UserProfileActor = actor {
        createUserProfile: (userPrincipal: Principal, userProfile : UserProfile) -> async Result<UserProfile, Text>;
    };
};