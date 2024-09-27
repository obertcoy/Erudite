import { convertUint8ArrayToImageURL } from '@/lib/utils';
import { Principal } from '@ic-reactor/react/dist/types';

export type RawUserEntity = {
  internetIdentity: Principal;
  bio: string;
  username: string;
  email: string;
  gender: string;
  profileImage: Uint8Array | number[];
  bannerImage: Uint8Array | number[];
  numFollowers: BigInt;
  numFollowing: BigInt;
};

export type UserEntity = {
  internetIdentity: string;
  bio: string;
  username: string;
  email: string;
  gender: string;
  profileImageUrl: string;
  bannerImageUrl: string;
  numFollowers: number;
  numFollowing: number;
};

export default class User {
  internetIdentity: string;
  bio: string;
  username: string;
  email: string;
  gender: string;
  profileImageUrl: string;
  bannerImageUrl: string;
  numFollowers: number;
  numFollowing: number;

  constructor({
    internetIdentity,
    username,
    email,
    gender,
    bio,
    profileImage,
    bannerImage,
    numFollowers,
    numFollowing,
  }: RawUserEntity) {
    this.internetIdentity = internetIdentity.toString();
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.bio = bio;
    this.profileImageUrl = convertUint8ArrayToImageURL(profileImage);
    this.bannerImageUrl = convertUint8ArrayToImageURL(bannerImage);
    this.numFollowers = Number(numFollowers);
    this.numFollowing = Number(numFollowing);
  }

  static castToUser(u: RawUserEntity): User {
    return new User({
      internetIdentity: u.internetIdentity,
      username: u.username,
      email: u.email,
      gender: u.gender,
      bio: u.bio,
      profileImage: u.profileImage,
      bannerImage: u.bannerImage,
      numFollowers: u.numFollowers,
      numFollowing: u.numFollowing,
    });
  }
}

export function convertRawUserEntityToUserEntity(
  raw: RawUserEntity,
): UserEntity {
  return {
    internetIdentity: raw.internetIdentity.toString(),
    username: raw.username,
    email: raw.email,
    gender: raw.gender,
    bio: raw.bio,
    profileImageUrl: convertUint8ArrayToImageURL(raw.profileImage),
    bannerImageUrl: convertUint8ArrayToImageURL(raw.bannerImage),
    numFollowers: Number(raw.numFollowers),
    numFollowing: Number(raw.numFollowing),
  };
}

export function convertAllRawUserEntityToUserEntity(
  raws: RawUserEntity[],
): UserEntity[] {
  const converted: UserEntity[] = raws.map((raw) => {
    return convertRawUserEntityToUserEntity(raw);
  });

  return converted;
}
