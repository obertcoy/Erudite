import Result "mo:base/Result";
import Text "mo:base/Text";
import Bool "mo:base/Bool";

module {
  public type Result<Ok, Err> = Result.Result<Ok, Err>;

  //hub datatype
  public type Hub = {
    hubID : Nat64;
    hubName : Text;
    hubDescription : Text;
    hubBannerImage : Blob;
    hubRoles : [Role];
    hubRules : [Rule];
  };

  public type Role = {
    roleName : Text;
    permissions : Permission;
    default: Bool;
  };

  public type Permission = {
    canDeletePost : Bool;
    canEditHub : Bool;
    canCreateEditRoles : Bool;
    canKickMember : Bool;
  };

  public type Rule = {
    ruleTitle : Text;
    ruleDescription : Text;
  };
};
