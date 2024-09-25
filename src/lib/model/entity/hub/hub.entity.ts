import {
  convertImageURLToUint8Array,
  convertUint8ArrayToImageURL,
} from '@/lib/utils';
import { PermissionEntity } from './permision.entity';
import { RoleEntity } from './role.entity';
import { RuleEntity } from './rules.entity';

export type RawHubEntity = {
  hubID: BigInt;
  hubName: string;
  hubDescription: string;
  hubBannerImage: Uint8Array | number[];
  hubRules: RuleEntity[];
  hubRoles: RoleEntity[];
};

export type HubEntity = {
  hubID: string;
  hubName: string;
  hubDescription: string;
  hubBannerImageUrl: string;
  hubRules: RuleEntity[];
  hubRoles: RoleEntity[];
};

export function convertRawHubEntityToHubEntity(raw: RawHubEntity): HubEntity {
  return {
    hubID: raw.hubID.toString(),
    hubName: raw.hubName,
    hubDescription: raw.hubDescription,
    hubBannerImageUrl: convertUint8ArrayToImageURL(raw.hubBannerImage),
    hubRules: raw.hubRules,
    hubRoles: raw.hubRoles,
  };
}

// Example dummy roles

// Example dummy rules with descriptions
const dummyRules: RuleEntity[] = [
  {
    ruleTitle: 'No Offensive Language',
    ruleDescription:
      'Ensure all discussions are polite and respectful. Avoid using any offensive or harmful language.',
  },
  {
    ruleTitle: 'Respect Others',
    ruleDescription:
      'Treat all members with respect, regardless of their opinions or background.',
  },
  {
    ruleTitle: 'Stay on Topic',
    ruleDescription:
      'Ensure that discussions remain relevant to the hub’s theme or the topic being discussed.',
  },
  {
    ruleTitle: 'No Spam or Self-Promotion',
    ruleDescription:
      'Do not post irrelevant content, spam, or promote personal services without permission.',
  },
  {
    ruleTitle: 'Provide Accurate Information',
    ruleDescription:
      'Always share information that is truthful, accurate, and verified, especially on important matters.',
  },
  {
    ruleTitle: 'No Eating Allowed',
    ruleDescription:
      'Avoid bringing food into the workspace or shared areas where it may disturb others.',
  },
  {
    ruleTitle: 'Follow Privacy Guidelines',
    ruleDescription:
      'Do not share personal information without consent and respect the privacy of others.',
  },
];

// Example dummy roles
const dummyRoles: RoleEntity[] = [
  {
    roleName: 'Owner',
    permissions: {
      canDeletePost: true,
      canEditHub: true,
      canCreateEditRoles: true,
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

// Example dummy hubs with rules and descriptions assigned
const dummyHubs: HubEntity[] = [
  {
    hubID: '234',
    hubName: 'AlamakHub',
    hubDescription: 'A vibrant community for discussions and networking.',
    hubBannerImageUrl: '', // Empty string
    hubRules: [dummyRules[0], dummyRules[1], dummyRules[2]], // General rules for discussions
    hubRoles: [dummyRoles[0], dummyRoles[1]], // Owner and Admin roles
  },
  {
    hubID: '235',
    hubName: 'TechTalks',
    hubDescription: 'All about technology and innovations.',
    hubBannerImageUrl: '', // Empty string
    hubRules: [dummyRules[1], dummyRules[2], dummyRules[4]], // Respect others, stay on topic, provide accurate info
    hubRoles: [dummyRoles[1], dummyRoles[2]], // Admin and Member roles
  },
  {
    hubID: '236',
    hubName: 'CreativeCorner',
    hubDescription: 'A space for artists and creators.',
    hubBannerImageUrl: '', // Empty string
    hubRules: [dummyRules[0], dummyRules[1], dummyRules[5]], // Offensive language, respect others, no eating allowed
    hubRoles: [dummyRoles[0]], // Only Owner role
  },
  {
    hubID: '237',
    hubName: 'HealthHub',
    hubDescription: 'Discussions around health and wellness.',
    hubBannerImageUrl: '', // Empty string
    hubRules: [dummyRules[4], dummyRules[1], dummyRules[6]], // Accurate information, respect others, follow privacy guidelines
    hubRoles: [dummyRoles[1]], // Only Admin role
  },
  {
    hubID: '238',
    hubName: 'EducationZone',
    hubDescription: 'A hub for learners and educators.',
    hubBannerImageUrl: '', // Empty string
    hubRules: [dummyRules[0], dummyRules[4], dummyRules[2]], // Offensive language, accurate information, stay on topic
    hubRoles: [dummyRoles[2]], // Only Member role
  },
];

export default dummyHubs;
