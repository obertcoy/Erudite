import { PermissionEntity } from './permision.entity';

export type RoleEntity = {
  roleName: string;
  permissions: PermissionEntity;
  default: boolean;
};

export type RoleEntityWithHubId = RoleEntity & { hubId: string };
