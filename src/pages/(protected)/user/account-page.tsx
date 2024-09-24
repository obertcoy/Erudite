import { useFetchUser } from '@/hooks/use-fetch-user';
import { useParams } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditUserAccountDto,
  EditUserAccountSchema,
} from '@/lib/model/schema/user/edit/edit-user-account.dto';
import { EditUserProfileSchema } from '@/lib/model/schema/user/edit/edit-user-profile.dto';
import { userUpdate } from '@/services/user-service';
import { cn, convertImageURLToUint8Array } from '@/lib/utils';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import useAuthContext from '@/hooks/use-auth-context';
import { Button } from '@/components/ui/button';
import { genders } from '@/lib/model/schema/user/register-user.dto';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AccountPage() {
  const { user, fetchUser } = useAuthContext();
  const { updateUser } = userUpdate();

  const form = useForm<EditUserAccountDto>({
    resolver: zodResolver(EditUserAccountSchema),
    defaultValues: {
      email: user?.email ?? '',
      gender: user?.gender ?? '',
    },
  });

  const onSubmit = async (values: EditUserAccountDto) => {
    if (user) {
      const toastId = toast.loading('Updating personal information...');

      const profileImage = await convertImageURLToUint8Array(
        user.profileImageUrl,
      );
      const bannerImage = await convertImageURLToUint8Array(
        user.bannerImageUrl,
      );

      const result = await updateUser([
        user.username,
        values.email,
        values.gender,
        user.bio,
        profileImage,
        bannerImage,
      ]);

      if (result && 'err' in result) {
        toast.error('Error on updating personal information : ' + result.err, {
          id: toastId,
        });
      } else {
        await fetchUser();

        toast.success('Personal information updated successfully', {
          id: toastId,
        });
      }
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account information and preferences.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your email and gender information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Change your email"
                          type="email"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Your email helps us keep you informed about your account
                        and our services.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Gender</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between h-10',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? genders.find(
                                    (gender) => gender.value === field.value,
                                  )?.label
                                : 'Select gender'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search gender..." />
                            <CommandList>
                              <CommandEmpty>No gender found.</CommandEmpty>
                              <CommandGroup>
                                {genders.map((gender) => (
                                  <CommandItem
                                    value={gender.label}
                                    key={gender.value}
                                    onSelect={() => {
                                      form.setValue('gender', gender.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        gender.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {gender.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please select your gender accurately, to provide a more
                        personalized experience.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
