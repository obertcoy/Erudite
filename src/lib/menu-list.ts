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
          path: '/create-community',
          label: 'Create Community',
          active: pathname.includes('/create-community'),
          icon: Plus,
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
      groupLabel: 'Joined Communities',
      menus: [
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
