import Result "mo:base/Result";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    //user datatype
    public type User = {
      internet_identity : Principal;
      first_name : Text;
      last_name : Text;
      username : Text;
      email : Text;
   };
};