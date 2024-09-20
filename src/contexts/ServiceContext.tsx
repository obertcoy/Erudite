import { canisterId as userCanisterId, idlFactory as userIdlFactory, user } from "@/declarations/user";
import { _SERVICE as _SERVICE_USER } from "@/declarations/user/user.did"
import { createReactor, useAgentManager } from "@ic-reactor/react";
import { ActorSubclass, CreateReactorReturnType } from "@ic-reactor/react/dist/types"
import { createContext, useEffect, useMemo, useState } from "react";

type Service = {
    userService: CreateReactorReturnType<ActorSubclass<_SERVICE_USER>>;
    userCanisterId: string;
    isAuthenticating: boolean;
}

export const ServiceContext = createContext<Service|undefined>(undefined);

interface ServiceProps {
    children: React.ReactNode;
}


export function ServiceContextProvider({children}:ServiceProps){
    const agentManager = useAgentManager();
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    useEffect(() => {
        const unsub = agentManager.subscribeAuthState((authState) => {
            if (authState.authenticating) {
                setIsAuthenticating(true);
            } else {
                setIsAuthenticating(false);
            }
        });

        return () => {
            unsub();
        };
    }, [agentManager]);

    const getUserService = () => {
        return createReactor<typeof user>({
            canisterId: userCanisterId,
            idlFactory: userIdlFactory,
            agentManager
        });
    };

    const userService = useMemo(() => getUserService(), [agentManager]);

    return (
        <ServiceContext.Provider value={{
            userService, isAuthenticating, userCanisterId
        }}>
            {children}
        </ServiceContext.Provider>
    );
}