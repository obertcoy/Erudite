import {
  canisterId as userCanisterId,
  idlFactory as userIdlFactory,
  user,
} from '@/declarations/user';

import {
  canisterId as hubCanisterId,
  idlFactory as hubIdlFactory,
  hub,
} from '@/declarations/hub';

import {
  canisterId as userHubMembershipCanisterId,
  idlFactory as userHubMembershipIdlFactory,
  userHubMembership,
} from '@/declarations/userHubMembership';

import {
  canisterId as postCanisterId,
  idlFactory as postIdlFactory,
  post,
} from '@/declarations/post';

import {
  canisterId as hubPostsCanisterId,
  idlFactory as hubPostsIdlFactory,
  hubPosts,
} from '@/declarations/hubPosts';

import { _SERVICE as _SERVICE_USER } from '@/declarations/user/user.did';
import { _SERVICE as _SERVICE_HUB } from '@/declarations/hub/hub.did';
import { _SERVICE as _SERVICE_USERHUBMEMBERSHIP } from '@/declarations/userHubMembership/userHubMembership.did';
import { _SERVICE as _SERVICE_POST } from '@/declarations/post/post.did';
import { _SERVICE as _SERVICE_HUBPOSTS } from '@/declarations/hubPosts/hubPosts.did';
import { createReactor, useAgentManager } from '@ic-reactor/react';
import {
  ActorSubclass,
  CreateReactorReturnType,
} from '@ic-reactor/react/dist/types';
import { createContext, useEffect, useMemo, useState } from 'react';

type Service = {
  userService: CreateReactorReturnType<ActorSubclass<_SERVICE_USER>>;
  hubService: CreateReactorReturnType<ActorSubclass<_SERVICE_HUB>>;
  userHubMembershipService: CreateReactorReturnType<
    ActorSubclass<_SERVICE_USERHUBMEMBERSHIP>
  >;
  postService: CreateReactorReturnType<ActorSubclass<_SERVICE_POST>>;
  hubPostsService: CreateReactorReturnType<ActorSubclass<_SERVICE_HUBPOSTS>>;

  userCanisterId: string;
  hubCanisterId: string;
  userHubMembershipCanisterId: string;
  postCanisterId: string;
  hubPostsCanisterId: string;

  isAuthenticating: boolean;
};

export const ServiceContext = createContext<Service | undefined>(undefined);

interface ServiceProps {
  children: React.ReactNode;
}

export function ServiceContextProvider({ children }: ServiceProps) {
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
    console.log("User Service:", userCanisterId, userIdlFactory, agentManager);


    return createReactor<typeof user>({
      canisterId: userCanisterId,
      idlFactory: userIdlFactory,
      agentManager,
    });
  };

  const getHubService = () => {
    return createReactor<typeof hub>({
      canisterId: hubCanisterId,
      idlFactory: hubIdlFactory,
      agentManager,
    });
  };

  const getUserHubMembershipService = () => {
    return createReactor<typeof userHubMembership>({
      canisterId: userHubMembershipCanisterId,
      idlFactory: userHubMembershipIdlFactory,
      agentManager,
    });
  };

  const getPostService = () => {
    return createReactor<typeof post>({
      canisterId: postCanisterId,
      idlFactory: postIdlFactory,
      agentManager,
    });
  };

  const getHubPostsService = () => {
    return createReactor<typeof hubPosts>({
      canisterId: hubPostsCanisterId,
      idlFactory: hubPostsIdlFactory,
      agentManager,
    });
  };

  const userService = useMemo(() => {
    const service = getUserService();
    return service;
  }, [agentManager]);
  
  const hubService = useMemo(() => getHubService(), [agentManager]);
  const userHubMembershipService = useMemo(
    () => getUserHubMembershipService(),
    [agentManager],
  );
  const postService = useMemo(() => getPostService(), [agentManager]);
  const hubPostsService = useMemo(() => getHubPostsService(), [agentManager]);

  return (
    <ServiceContext.Provider
      value={{
        userService,
        hubService,
        userHubMembershipService,
        postService,
        hubPostsService,
        isAuthenticating,
        userCanisterId,
        hubCanisterId,
        userHubMembershipCanisterId,
        postCanisterId,
        hubPostsCanisterId,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
