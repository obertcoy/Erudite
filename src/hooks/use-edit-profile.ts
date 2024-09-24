import { SearchResultsEntity } from '@/lib/model/entity/search-results-entity';
import { RouteEnum } from '@/lib/enum/route-enum';
import { SearchResultsEnum } from '@/lib/enum/search-results-enum';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { EditUserProfileDto } from '@/lib/model/schema/user/edit/edit-user-profile.dto';
import { RawUserEntity, UserEntity } from '@/lib/model/entity/user/user.entity';
import { userUpdate } from '@/services/user-service';
import { convertImageURLToUint8Array } from '@/lib/utils';

interface EditProfileStoreProps {
  initialize: (data: EditUserProfileDto) => void;
  setUsername: (username: string) => void;
  setBio: (bio: string) => void;
  setProfileImage: (img: File) => void;
  setBannerImage: (img: File) => void;
}

export const useEditProfileStore = create(
  persist<EditUserProfileDto & EditProfileStoreProps>(
    (set, get) => ({
      username: '',
      bio: '',
      profileImageUrl: '',
      bannerImageUrl: '',

      initialize: (data: EditUserProfileDto) => {
        set({
          username: data.username,
          bio: data.bio,
          profileImageUrl: data.profileImageUrl,
          bannerImageUrl: data.bannerImageUrl,
        });
      },

      setUsername: (username: string) => {
        set({ username: username });
      },

      setBio: (bio: string) => {
        set({ bio: bio });
      },

      setProfileImage: (img: File) => {
        const imageUrl = URL.createObjectURL(img);
        set({ profileImageUrl: imageUrl });
      },

      setBannerImage: (img: File) => {
        const imageUrl = URL.createObjectURL(img);
        set({ bannerImageUrl: imageUrl });
      },

    
    }),
    {
      name: 'edit-profile',
    },
  ),
);
