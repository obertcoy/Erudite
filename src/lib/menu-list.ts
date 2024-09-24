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
} from 'lucide-react';
import { Route, RouteObject } from 'react-router-dom';
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
      groupLabel: '',
      menus: [
        {
          path: RouteEnum.HOME,
          label: 'Home',
          active: pathname.includes(RouteEnum.HOME),
          icon: House,
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
          path: RouteEnum.ACCOUNT,
          label: 'Account',
          active: pathname.includes(RouteEnum.ACCOUNT),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
