import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { RouteEnum } from '@/lib/enum/route-enum';
import { AuthClient } from '@dfinity/auth-client';
import { registerUserUpdate } from '@/services/user-service';
import useAuthContext from '@/hooks/use-auth-context';
import { RawUserEntity, UserEntity } from '@/lib/model/entity/user/user.entity';
import { useForm } from 'react-hook-form';
import {
  genders,
  RegisterUserDto,
  RegisterUserSchema,
} from '@/lib/model/schema/user/register-user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Principal } from '@ic-reactor/react/dist/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

const local_ii_url = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;

export function SignupForm() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const { login, fetchUser, getIdentity } = useAuthContext();
  const { registerUser } = registerUserUpdate();

  const navigate = useNavigate();

  const form = useForm<RegisterUserDto>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = async (data: RegisterUserDto) => {
    await login({
      onSuccess: async () => {
        const principal: Principal | undefined = getIdentity()?.getPrincipal();
        let result = null;

        if (principal) {
          result = await registerUser([
            data.username,
            data.email,
            data.gender,
            [principal],
          ]);
        } else {
          result = await registerUser([
            data.username,
            data.email,
            data.gender,
            [],
          ]);
        }

        console.log('Register: ' + result);

        if (result && 'err' in result) {
          toast(result.err);
        } else {
          await fetchUser();
          navigate(RouteEnum.HOME);
        }
      },
      onError: (error) => {
        toast(error);
      },
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-w-md w-full m-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Erudite
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Sign up to Erudite for exciting forums. It's easy and quick!
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <LabelInputContainer className="mb-4">
            <Label>Gender</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  role="combobox"
                  aria-expanded={open}
                  className="w-full h-10 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-800 dark:text-neutral-200 flex justify-between items-center"
                >
                  {value
                    ? genders.find((gender) => gender.value === value)?.label
                    : 'Select gender...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search gender..." />
                  <CommandList>
                    <CommandEmpty>No gender found.</CommandEmpty>
                    <CommandGroup>
                      {genders.map((gender) => (
                        <CommandItem
                          key={gender.value}
                          value={gender.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue,
                            );
                            setOpen(false);
                            
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === gender.value
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
          </LabelInputContainer> */}
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
                            'w-full justify-between',
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </Form>

        <div className="flex flex-col mt-4">
          <div className="flex gap-x-1">
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Already have an account?
            </span>
            <Link
              to={RouteEnum.LOGIN}
              className="font-medium underline text-sm"
            >
              Sign in
            </Link>
          </div>
          <BottomGradient />
        </div>
      </div>
    </div>
  );
}
