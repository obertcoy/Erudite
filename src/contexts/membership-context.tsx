import useGetJoinedMemberships from '@/hooks/membership/use-get-joined-hubs';
import useGetUserMemberships from '@/hooks/membership/use-get-user-memberships';
import useAuthContext from '@/hooks/use-auth-context';
import { PermissionEntity } from '@/lib/model/entity/hub/permision.entity';
import { MembershipEntity } from '@/lib/model/entity/membership.ts/membership.entity';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHubContext } from './hub-context';

interface MembershipContextProps {
  userMemberships: MembershipEntity[];
  fetchUserMemberships: () => void;
  hasPermissionInHub: (
    hubId: string,
    permision: keyof PermissionEntity,
  ) => boolean;
  hasAnyPermissionInHub: (hubId: string) => boolean;
}

interface MembershipProps {
  children: React.ReactNode;
}

const MembershipContext = createContext<MembershipContextProps>({
  userMemberships: [],
  fetchUserMemberships: () => undefined,
  hasPermissionInHub: () => false,
  hasAnyPermissionInHub: () => false,
});

export function MembershipProvider({ children }: MembershipProps) {
  const { user, getIdentity } = useAuthContext();
  const { joinedHubs } = useHubContext();

  const { userMemberships, fetchUserMemberships } = useGetUserMemberships(
     getIdentity()?.getPrincipal().toString() ,
    );
        

  const hasPermissionInHub = (
    hubId: string,
    permission: keyof PermissionEntity,
  ) => {
      
      console.log(userMemberships);
      
      const foundMembership = userMemberships.find(
          (membership) => (membership.hubId = hubId),
        );
        
      if (!foundMembership) return false;
        
      const foundHub = joinedHubs.find((hub) => hub.hubID == hubId);
        
        if (!foundHub) return false;
        
        const userRole = foundHub.hubRoles.find(
            (role) => role.roleName == foundMembership.userRole,
        );
        
        if (!userRole) return false;
        
    return userRole.permissions[permission] || false;
  };

  const hasAnyPermissionInHub = (hubId: string) => {

    const foundMembership = userMemberships.find(
      (membership) => membership.hubId == hubId,
    );

    if (!foundMembership) return false;

    const foundHub = joinedHubs.find((hub) => hub.hubID == hubId);

    if (!foundHub) return false;

    const userRole = foundHub.hubRoles.find(
      (role) => role.roleName == foundMembership.userRole,
    );

    if (!userRole) return false;

      console.log("Any: " , userRole);
      
      
    return Object.values(userRole.permissions).some(
      (permission) => permission === true,
    );
  };

  useEffect(() => {
    fetchUserMemberships();
  }, [user, joinedHubs]);

  return (
    <MembershipContext.Provider
      value={{
        userMemberships,
        fetchUserMemberships,
        hasPermissionInHub,
        hasAnyPermissionInHub,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export const useMembershipContext = () => useContext(MembershipContext);
