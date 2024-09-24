import {
  convertImageURLToUint8Array,
  convertUint8ArrayToImageURL,
} from '@/lib/utils';
import { PermissionEntity } from './permision.entity';
import { RoleEntity } from './role.entity';

export type RawHubEntity = {
  hubID: BigInt;
  hubName: string;
  hubDescription: string;
  hubProfileImage: Uint8Array | number[];
  hubRoles: RoleEntity[];
};

export type HubEntity = {
  hubID: string;
  hubName: string;
  hubDescription: string;
  hubProfileImageUrl: string;
  hubRoles: RoleEntity[];
};

export function convertRawHubEntityToHubEntity(raw: RawHubEntity): HubEntity {
  return {
    hubID: raw.hubID.toString(),
    hubName: raw.hubName,
    hubDescription: raw.hubDescription,
    hubProfileImageUrl: convertUint8ArrayToImageURL(raw.hubProfileImage),
    hubRoles: raw.hubRoles,
  };
}

// Example dummy roles

const dummyRoles: RoleEntity[] = [
  {
    roleName: 'Owner',
    permissions: {
      canDeletePost: true,
      canEditHub: true,
      canCreateEditRoles: true, // Assuming this property exists in PermissionEntity
      canKickMember: true,
    } as PermissionEntity,
  },
  {
    roleName: 'Admin',
    permissions: {
      canDeletePost: true,
      canEditHub: true,
      canCreateEditRoles: false,
      canKickMember: true,
    } as PermissionEntity,
  },
  {
    roleName: 'Member',
    permissions: {
      canDeletePost: false,
      canEditHub: false,
      canCreateEditRoles: false,
      canKickMember: false,
    } as PermissionEntity,
  },
];

// Example dummy hubs
const dummyHubs: HubEntity[] = [
  {
    hubID: '234',
    hubName: 'AlamakHub',
    hubDescription: 'A vibrant community for discussions and networking.',
    hubProfileImageUrl: '', // Empty string
    hubRoles: [dummyRoles[0], dummyRoles[1]], // Owner and Admin roles
  },
  {
    hubID: '235',
    hubName: 'TechTalks',
    hubDescription: 'All about technology and innovations.',
    hubProfileImageUrl: '', // Empty string
    hubRoles: [dummyRoles[1], dummyRoles[2]], // Admin and Member roles
  },
  {
    hubID: '236',
    hubName: 'CreativeCorner',
    hubDescription: 'A space for artists and creators.',
    hubProfileImageUrl: '', // Empty string
    hubRoles: [dummyRoles[0]], // Only Owner role
  },
  {
    hubID: '237',
    hubName: 'HealthHub',
    hubDescription: 'Discussions around health and wellness.',
    hubProfileImageUrl: '', // Empty string
    hubRoles: [dummyRoles[1]], // Only Admin role
  },
  {
    hubID: '238',
    hubName: 'EducationZone',
    hubDescription: 'A hub for learners and educators.',
    hubProfileImageUrl: '', // Empty string
    hubRoles: [dummyRoles[2]], // Only Member role
  },
];

export default dummyHubs;
