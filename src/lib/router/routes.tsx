import useServiceContext from '@/hooks/use-service-context';
import ErrorBoundaryLayout from '@/layout/error-boundary-layout';
import MainLayout from '@/layout/main-layout';
import { RouteEnum } from '@/lib/enum/route-enum';
import createUserLoader from '@/loader/user-loader';
import getUserLoader from '@/loader/user-loader';
import AccountPage from '@/pages/(protected)/user/account-page';
import EditProfilePage from '@/pages/(protected)/user/edit-profile-page';
import ProfilePage from '@/pages/(protected)/user/profile-page';
import HomePage from '@/pages/(public)/home-page';
import LoginPage from '@/pages/(public)/login-page';
import NotFound from '@/pages/(public)/not-found';
import RegisterPage from '@/pages/(public)/register-page';
import { getUserQuery } from '@/services/user-service';
import { LoaderFunctionArgs, RouteObject } from 'react-router-dom';

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
            element: <EditProfilePage />,
          },
          {
            path: RouteEnum.ACCOUNT,
            element: <AccountPage />,
          },
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
