import useGetJoinedHubs from '@/hooks/membership/use-get-joined-hubs';
import useAuthContext from '@/hooks/use-auth-context';

import { HubEntity } from '@/lib/model/entity/hub/hub.entity';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface HubContextProps {
  joinedHubs: HubEntity[];
  fetchJoinedHubs: () => void;
}

interface HubProps {
  children: React.ReactNode;
}

const HubContext = createContext<HubContextProps>({
  joinedHubs: [],
  fetchJoinedHubs: () => undefined,
});

export function HubProvider({ children }: HubProps) {
    const {user} = useAuthContext()
  const { joinedHubs, fetchJoinedHubs } = useGetJoinedHubs(user?.internetIdentity); // faster load with user

  return (
    <HubContext.Provider value={{ joinedHubs, fetchJoinedHubs }}>
      {children}
    </HubContext.Provider>
  );
}

export const useHubContext = () => useContext(HubContext);
