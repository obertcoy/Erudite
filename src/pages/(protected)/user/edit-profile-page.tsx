import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  EditUserProfileDto,
  EditUserProfileSchema,
} from '@/lib/model/schema/user/edit/edit-user-profile.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import ProfileHeaderInformation, {
  dummyUser,
} from '@/components/custom/profile/profile-header-information';
import { Textarea } from '@/components/ui/textarea';
import { useEditProfileStore } from '@/hooks/use-edit-profile';
import { useEffect } from 'react';
import { useFetchUser } from '@/hooks/use-fetch-user';
import { userProfileUpdate } from '@/services/user-service';
import {
  compressImageURLToUint8Array,
  convertImageURLToUint8Array,
  generateDynamicRoutePath,
} from '@/lib/utils';
import { toast } from 'sonner';
import { RouteEnum } from '@/lib/enum/route-enum';
import useAuthContext from '@/hooks/use-auth-context';

export default function EditProfilePage() {
  const { userId } = useParams();
  const { fetchUser } = useAuthContext();
  const { userData } = useFetchUser(userId);
  const { updateUserProfile } = userProfileUpdate();

  const navigate = useNavigate();

  const {
    initialize,
    setUsername,
    setBio,
    username,
    bio,
    profileImageUrl,
    bannerImageUrl,
  } = useEditProfileStore();

  const form = useForm<EditUserProfileDto>({
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      username: username || 'Kelvinices',
      bio: bio || 'Hello! My name is Kelvin ...ackhsually 🤓',
    },
  });

  const onSubmit = async (values: EditUserProfileDto) => {
    if (userData) {
      let profileImage =
        (await compressImageURLToUint8Array(profileImageUrl ?? '')) ??
        new Uint8Array();
      let bannerImage =
        (await compressImageURLToUint8Array(bannerImageUrl ?? '')) ??
        new Uint8Array();

      const result = await updateUserProfile([
        values.username ?? userData.username,
        userData.email,
        userData.gender,
        values.bio ?? userData.bio,
        profileImage,
        bannerImage,
      ]);

      if (result && 'err' in result) {
        console.log(result.err);
      } else {
        await fetchUser();

        toast.success('Profile updated successfully');

        navigate(
          generateDynamicRoutePath(RouteEnum.USER, { userId: userId ?? '' }),
        );
      }
    }
  };

  useEffect(() => {
    if (userData) initialize(userData);
  }, [userData]);

  return (
    <div className="flex flex-col w-full h-full m-auto p-8">
      <h3 className="text-lg font-medium my-4">What others see</h3>
      <div className="flex flex-col xl:flex-row gap-8 ">
        <div className="w-full p-8 border rounded-md">
          <ProfileHeaderInformation
            data={{
              internetIdentity: userData?.internetIdentity ?? '',
              email: userData?.email ?? '',
              gender: userData?.gender ?? '',
              username: username ?? userData?.username ?? '',
              bio: bio ?? userData?.bio ?? '',
              profileImageUrl:
                profileImageUrl ?? userData?.profileImageUrl ?? '',
              bannerImageUrl: bannerImageUrl ?? userData?.bannerImageUrl ?? '',
            }}
            isCurrentUser={false}
            isEditing={true}
          />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 xl:max-w-lg w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Change your username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                      value={username}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-32 resize-none"
                      placeholder="Hello! My name is Kelvin ...ackhsually 🤓"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setBio(e.target.value);
                      }}
                      value={bio}
                    />
                  </FormControl>
                  <FormDescription>Tell us about yourself.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
