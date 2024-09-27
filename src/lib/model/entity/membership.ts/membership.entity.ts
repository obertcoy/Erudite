import { Principal } from '@ic-reactor/react/dist/types';
import { UserEntity } from '../user/user.entity';

export type RawMembershipEntity = {
  hubId: bigint;
  userIdentity: Principal;
  userRole: string;
};

export type MembershipEntity = {
  hubId: string;
  userIdentity: string;
  userRole: string;
};

export type UserMembershipEntity = {
    user: UserEntity,
    membership: MembershipEntity;
}

export function convertRawMembershipEntityToMembershipEntity(
  raw: RawMembershipEntity,
): MembershipEntity {
  return {
    hubId: raw.hubId.toString(),
    userIdentity: raw.userIdentity.toString(),
    userRole: raw.userRole,
  };
}

export function convertAllRawMembershipEntityToMembershipEntity(
  raws: RawMembershipEntity[],
): MembershipEntity[] {
  const converted: MembershipEntity[] = raws.map((raw) => {
    return convertRawMembershipEntityToMembershipEntity(raw);
  });

  return converted;
}
