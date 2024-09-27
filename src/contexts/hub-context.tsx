import useGetJoinedHubs from '@/hooks/membership/use-get-joined-hubs';
import useGetUserMemberships from '@/hooks/membership/use-get-user-memberships';
import useAuthContext from '@/hooks/use-auth-context';

import { HubEntity } from '@/lib/model/entity/hub/hub.entity';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface HubContextProps {
  joinedHubs: HubEntity[];
  fetchJoinedHubs: () => void;
  isHubJoined: (hubId: string) => boolean;
}

interface HubProps {
  children: React.ReactNode;
}

const HubContext = createContext<HubContextProps>({
  joinedHubs: [],
  fetchJoinedHubs: () => undefined,
  isHubJoined: () => false,
});

export function HubProvider({ children }: HubProps) {
  const { user } = useAuthContext();
  const { joinedHubs, fetchJoinedHubs } = useGetJoinedHubs(
    user?.internetIdentity,
  ); // faster load with user

  const isHubJoined = (hubId: string) => {
    return !!joinedHubs.find((h) => h.hubID === hubId);
  };

  useEffect(() => {
    fetchJoinedHubs();
  }, [user]);

  return (
    <HubContext.Provider value={{ joinedHubs, fetchJoinedHubs, isHubJoined }}>
      {children}
    </HubContext.Provider>
  );
}

export const useHubContext = () => useContext(HubContext);
