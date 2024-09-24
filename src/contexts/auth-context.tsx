import { getUserQuery } from '@/services/user-service';
import { useAgentManager, useAuth } from '@ic-reactor/react';
import { AuthClientLoginOptions } from '@ic-reactor/react/dist/types';
import { createContext, useEffect, useState } from 'react';
import { Identity } from '@dfinity/agent';
import useServiceContext from '@/hooks/use-service-context';
import User, { UserEntity } from '@/lib/model/entity/user/user.entity';
import { convertRawUserEntityToUserEntity } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextProps {
  user: UserEntity | null | undefined;
  setUser: (user: User | null | undefined) => void;
  login: (options?: AuthClientLoginOptions) => Promise<void>;
  logout: () => Promise<void>;
  getIdentity: () => Identity | null;
  fetchUser: () => Promise<void>;
}

interface AuthProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  setUser: () => undefined,
  login: async () => undefined,
  getIdentity: () => null,
  logout: async () => undefined,
  fetchUser: async () => undefined,
});

export function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<UserEntity | undefined | null>();
  const { isAuthenticating } = useServiceContext();
  const { getUser, getUserLoading } = getUserQuery();
  const { login, logout, getIdentity } = useAgentManager();

  const handleLogout = async () => {
    const toastId = toast.loading('Signing you out...');

    try {
      await logout({ returnTo: RouteEnum.REGISTER });

      setUser(null);

      toast.success('Signed out successfully!', { id: toastId });
    } catch (error) {
      toast.error('Failed to sign out', { id: toastId });
    }
  };

  const fetchUser = async () => {
    const result = await getUser([[], []]);
    if (!result || 'err' in result) {
      await logout();
      setUser(null);
      return;
    }
    console.log('Result: ' + result.ok.internetIdentity);

    setUser(convertRawUserEntityToUserEntity(result.ok));
  };

  useEffect(() => {
    if (user === undefined && !isAuthenticating && !getUserLoading) {
      fetchUser();
    }
  }, [isAuthenticating]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout: handleLogout,
        fetchUser,
        getIdentity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
