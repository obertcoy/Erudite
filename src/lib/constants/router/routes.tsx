import ErrorBoundaryLayout from '@/layout/error-boundary-layout';
import MainLayout from '@/layout/main-layout';
import HomePage from '@/pages/(public)/home-page';
import LoginPage from '@/pages/(public)/login_page';
import NotFound from '@/pages/(public)/not-found';
import RegisterPage from '@/pages/(public)/register_page';
import { RouteObject } from 'react-router-dom';

export const ROUTES: RouteObject[] = [
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
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
    ],
  },
];
