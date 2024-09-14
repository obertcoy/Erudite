import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { GROUP_ROUTES, INDEPENDENT_ROUTES } from './routes';
import {
  GroupRoutes,
  Route as RouteInterface,
} from '@/lib/model/interfaces/route';
import { LayoutEnum } from '@/lib/enum/layout-enum';
import PublicLayout from '@/layout/public-layout';

const createGroupRoutes = (group: GroupRoutes[]): JSX.Element[] => {
  return group.flatMap((group: GroupRoutes) => {
    switch (group.layout) {
      case LayoutEnum.PUBLIC:
        return group.children.map((route: RouteInterface) => (
          <Route
            key={group.prefix + route.path}
            path={route.path}
            element={<PublicLayout>{route.element}</PublicLayout>}
          />
        ));

      default:
        return group.children.map((route: RouteInterface) => (
          <Route key={group.prefix + route.path} path={route.path} element={route.element} />
        ));
    }
  });
};

const createIndependentRoutes = (routes: RouteInterface[]): JSX.Element[] => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {createGroupRoutes(GROUP_ROUTES)}
      {createIndependentRoutes(INDEPENDENT_ROUTES)}
    </>,
  ),
);
