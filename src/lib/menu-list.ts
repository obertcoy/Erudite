import {
  LayoutGrid,
  LucideIcon,
  Microscope,
  LibraryBig,
  Coins,
  CreditCard,
  Settings,
  Plus,
} from 'lucide-react';
import { RouteObject } from 'react-router-dom';
import { RouteEnum } from './enum/route-enum';

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

export function getMenuList(pathname: string): Group[] {
  return [
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
    {
      groupLabel: 'Joined Hubs',
      menus: [
        {
          path: RouteEnum.CREATE_HUB,
          label: 'Create Hub',
          active: pathname.includes(RouteEnum.CREATE_HUB),
          icon: Plus,
          submenus: [],
        },
        {
          path: '/analyze',
          label: 'Analyzer',
          active: pathname.includes('/analyze'),
          icon: Microscope,
          submenus: [],
        },
        {
          path: '/history',
          label: 'Analysis Results',
          active: pathname.includes('/history'),
          icon: LibraryBig,
          submenus: [],
        },
      ],
    },
    
    {
      groupLabel: 'Settings',
      menus: [
        {
          path: '/user-profile',
          label: 'Account',
          active: pathname.includes('/user-profile'),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
