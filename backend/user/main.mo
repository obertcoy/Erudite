import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Types "types";

actor class UserMain() {
  type User = Types.User;
  //uses principas as key, the value is the rest of the user's data
  let user_data = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  //register function
  public shared (msg) func register(first_name : Text, last_name : Text, username : Text, email : Text) : async Result.Result<User, Text> {

    let internet_identity = msg.caller; 

    if(user_data.get(internet_identity) != null){
      return #err("User already exists");
    };

    for(user in user_data.vals()){
      if(user.email == email){
        return #err("Email already exist");
      };
    };

    for(user in user_data.vals()){
      if(user.username == username){
        return #err("Username already exist");
      };
    };

    let user = {
      internet_identity= internet_identity;
      first_name = first_name;
      last_name = last_name;
      username = username;
      email = email;
    };

    user_data.put(user.internet_identity, user);

    return #ok(user);
  };

  //get user
  public func getUser(principal : ?Principal) : async Result.Result<User, Text> {
    switch principal {
      case null {
        return #err("Principal is invalid");
      };
      case (?validPrincipal) {
        switch (user_data.get(validPrincipal)) {
          case null {
            return #err("User not found");
          };
          case (?fetched_user) {
            return #ok(fetched_user);
          };
        }
      };
    }
  }
};
