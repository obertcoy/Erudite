import { PermissionEntity } from "./permision.entity";

export type RoleEntity = {
    roleName: string;
    permissions: PermissionEntity;
  };
  