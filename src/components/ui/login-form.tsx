import React from 'react';
import { cn } from '@/lib/utils';
import { Actor, ActorMethod, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@ic-reactor/react/dist/types';
import { Link, useNavigate } from 'react-router-dom';
import { RouteEnum } from '@/lib/enum/route-enum';
import useAuthContext from '@/hooks/use-auth-context';
import { toast } from 'sonner';

//buat gradient
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

//buat label
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

//inisialisasi
const webapp_id = process.env.CANISTER_ID_BACKEND;
const local_ii_url = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;

//interface
const webapp_idl = ({ IDL }: any) => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ['query']) });
};
export const init = ({ IDL }: any) => {
  return [];
};

export interface _SERVICE {
  whoami: ActorMethod<[], Principal>;
}

document.body.onload = () => {};
export function LoginForm() {
  const { login, fetchUser, getIdentity } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({
      onSuccess: async () => {
        const principal = getIdentity()?.getPrincipal();

        if (principal) {
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
      <div className="max-w-lg w-full m-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Erudite
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Sign in to Erudite for exciting forums.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="johndoe@gmail.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer> */}

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign in &rarr;
            <BottomGradient />
          </button>
        </form>
        
        <div className="flex gap-x-1">
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Don't have an account?
          </span>
          <span className="font-medium underline text-sm">
            <Link to={RouteEnum.REGISTER}>Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
