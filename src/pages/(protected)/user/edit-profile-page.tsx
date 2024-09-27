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
import { useEditProfileStore } from '@/hooks/user/use-edit-profile';
import { useEffect } from 'react';
import { useGetUser } from '@/hooks/user/use-get-user';
import { userUpdate } from '@/services/user-service';
import {
  compressImageURLToUint8Array,
  convertImageURLToUint8Array,
  generateDynamicRoutePath,
} from '@/lib/utils';
import { toast } from 'sonner';
import { RouteEnum } from '@/lib/enum/route-enum';
import useAuthContext from '@/hooks/use-auth-context';


export default function EditProfilePage() {
  const { user, fetchUser } = useAuthContext();
  const { updateUser } = userUpdate();

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
  });

  const onSubmit = async (values: EditUserProfileDto) => {
    if (user) {
      const toastId = toast.loading('Updating profile...');

      const profileImage: Uint8Array | null =
        profileImageUrl && profileImageUrl !== ''
          ? await compressImageURLToUint8Array(profileImageUrl)
          : await convertImageURLToUint8Array(user.profileImageUrl);

      const bannerImage: Uint8Array | null =
        bannerImageUrl && bannerImageUrl !== ''
          ? await compressImageURLToUint8Array(bannerImageUrl)
          : await convertImageURLToUint8Array(user.bannerImageUrl);

      const result = await updateUser([
        values.username ?? user.username,
        user.email,
        user.gender,
        values.bio ?? user.bio,
        profileImage ?? new Uint8Array(),
        bannerImage ?? new Uint8Array(),
      ]);

      if (result && 'err' in result) {
        toast.error('Error on updating profile : ' + result.err, {
          id: toastId,
        });
      } else {
        await fetchUser();

        toast.success('Profile updated successfully', { id: toastId });

        navigate(
          generateDynamicRoutePath(RouteEnum.USER, {
            userId: user.internetIdentity ?? '',
          }),
        );
      }
    }
  };

  useEffect(() => {
    if (user) initialize(user);
  }, [user]);

  return (
    <main className="flex flex-col w-full h-full m-auto p-8">
      <h3 className="text-xl font-bold my-4">What others see</h3>
      <div className="flex flex-col xl:flex-row gap-8 ">
        <div className="w-full p-8 border rounded-md">
          <ProfileHeaderInformation
            data={{
              internetIdentity: user?.internetIdentity ?? '',
              email: user?.email ?? '',
              gender: user?.gender ?? '',
              username: username ?? user?.username ?? '',
              bio: bio ?? user?.bio ?? '',
              profileImageUrl: profileImageUrl ?? user?.profileImageUrl ?? '',
              bannerImageUrl: bannerImageUrl ?? user?.bannerImageUrl ?? '',
              numFollowers: user?.numFollowers ?? 0,
              numFollowing: user?.numFollowing ?? 0
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
    </main>
  );
}
