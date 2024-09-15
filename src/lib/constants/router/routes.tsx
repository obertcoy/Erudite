import MainLayout from '@/layout/main-layout';
import HomePage from '@/pages/(public)/home-page';
import LoginPage from '@/pages/(public)/login_page';
import RegisterPage from '@/pages/(public)/register_page';
import { RouteObject } from 'react-router-dom';

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    loader: false,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
];
