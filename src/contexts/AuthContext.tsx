import { getUserQuery } from "@/services/userService";
import { useAgentManager, useAuth } from "@ic-reactor/react";
import { AuthClientLoginOptions } from "@ic-reactor/react/dist/types";
import { createContext, useEffect, useState } from "react";
import { Identity } from "@dfinity/agent";
import User from "@/models/user";
import useServiceContext from "@/hooks/useServiceContext";

interface AuthContextProps {
    user: User | null | undefined;
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
    fetchUser: async () => undefined
});

export function AuthProvider ({ children }: AuthProps) {
    const [user, setUser] = useState<User | undefined | null>();
    const { isAuthenticating } = useServiceContext();
    const { getUser, getUserLoading } = getUserQuery();
    const { login, logout, getIdentity } = useAgentManager();

    const handleLogout = async () => {
        await logout();
        setUser(null);
    }

    const fetchUser = async () => {
        const result = await getUser([[]]);
        if (!result || 'err' in result) {
            await logout();
            setUser(null);
            return;
        }
        setUser(User.castToUser(result.ok));
    }
    
    useEffect(() => {
        if (user === undefined && !isAuthenticating && !getUserLoading) {
            fetchUser();
        }
    }, [isAuthenticating]);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login,
            logout: handleLogout,
            fetchUser,
            getIdentity
        }}>
            {children}
        </AuthContext.Provider>
    );
}

