import ErrorBoundaryLayout from '@/layout/error-boundary-layout';
import MainLayout from '@/layout/main-layout';
import { RouteEnum } from '@/lib/enum/route-enum';
import EditProfilePage from '@/pages/(protected)/user/edit-profile-page';
import ProfilePage from '@/pages/(protected)/user/profile-page';
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
        path: RouteEnum.ALL,
        element: <NotFound />,
      },
      {
        path: RouteEnum.HOME,
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: RouteEnum.USER,
            element: <ProfilePage />,
          },
          {
            path: RouteEnum.EDIT_PROFILE,
            element: <EditProfilePage/>
          }
        ],
      },
      {
        path: RouteEnum.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RouteEnum.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
];
