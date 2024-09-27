export enum RouteEnum {
  ALL = '*',
  LOGIN = '/login',
  REGISTER = '/register',
  HOME = '/',
  SEARCH = '/search',
  CREATE_POST = '/create-post',
  POST = '/posts/:postId',
  CREATE_HUB = '/create-hub',
  HUB = '/hubs/:hubId',
  MANAGE_HUB = '/hubs/:hubId/manage',
  USER = '/users/:userId',
  EDIT_PROFILE = '/users/edit',
  ACCOUNT = '/account',
  EXPLORE_HUBS = '/hubs'
}
