import { convertUint8ArrayToImageURL } from '@/lib/utils';
import { Principal } from '@ic-reactor/react/dist/types';

export type RawUserEntity = {
  bio: string;
  username: string;
  email: string;
  gender: string;
  profileImage: Uint8Array | number[];
  bannerImage: Uint8Array | number[];
};

export type UserEntity = {
  bio: string;
  username: string;
  email: string;
  gender: string;
  profileImageUrl: string;
  bannerImageUrl: string;
};

export default class User {
  bio: string;
  username: string;
  email: string;
  gender: string;
  profileImageUrl: string;
  bannerImageUrl: string;

  constructor({
    username,
    email,
    gender,
    bio,
    profileImage,
    bannerImage,
  }: RawUserEntity) {
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.bio = bio;
    this.profileImageUrl = convertUint8ArrayToImageURL(profileImage);
    this.bannerImageUrl = convertUint8ArrayToImageURL(bannerImage);
  }

  static castToUser(u: RawUserEntity): User {
    return new User({
      username: u.username,
      email: u.email,
      gender: u.gender,
      bio: u.bio,
      profileImage: u.profileImage,
      bannerImage: u.bannerImage,
    });
  }
}
