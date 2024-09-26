import {
  LayoutGrid,
  LucideIcon,
  Microscope,
  LibraryBig,
  Coins,
  CreditCard,
  Settings,
  Plus,
  Bookmark,
  House,
  Boxes,
  CornerDownRight,
  Box,
} from 'lucide-react';
import { Route, RouteObject } from 'react-router-dom';
import { RouteEnum } from './enum/route-enum';
import User from './model/entity/user/user.entity';
import { HubEntity } from './model/entity/hub/hub.entity';
import { generateDynamicRoutePath } from './utils';

type Submenu = RouteObject & {
  label: string;
  active: boolean;
};

type Menu = RouteObject & {
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};
export function getMenuList(pathname: string, user: User | null, joinedHubs: HubEntity[] = []): Group[] {
  const joinedHubsMenus: Menu[] = joinedHubs.slice(0, 5).map((hub) => ({
    path: generateDynamicRoutePath(RouteEnum.HUB, {hubId: hub.hubID}), 
    label: hub.hubName,
    active: pathname.includes(generateDynamicRoutePath(RouteEnum.HUB, {hubId: hub.hubID})),
    icon: Box,
    submenus: [],
  }));

const baseMenus: Group[] = [
    {
      groupLabel: '',
      menus: [
        {
          path: RouteEnum.HOME,
          label: 'Home',
          active: pathname === RouteEnum.HOME,
          icon: House,
          submenus: [],
        },
        {
          path: RouteEnum.EXPLORE_HUBS,
          label: 'Explore Hubs',
          active: pathname === RouteEnum.EXPLORE_HUBS,
          icon: Boxes,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Recent',
      menus: [
        {
          path: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
  ];

  // Add the "Joined Hubs" and "Settings" group only if the user is logged in
  if (user) {
    baseMenus.push({
      groupLabel: 'Joined Hubs',
      menus: [
        {
          path: RouteEnum.CREATE_HUB,
          label: 'Create Hub',
          active: pathname.includes(RouteEnum.CREATE_HUB),
          icon: Plus,
          submenus: [],
        },
        ...joinedHubsMenus, // Add dynamically generated joined hubs
      ],
    });

    baseMenus.push({
      groupLabel: 'Settings',
      menus: [
        {
          path: RouteEnum.ACCOUNT,
          label: 'Account',
          active: pathname.includes(RouteEnum.ACCOUNT),
          icon: Settings,
          submenus: [],
        },
      ],
    });
  }


  return baseMenus;
}
