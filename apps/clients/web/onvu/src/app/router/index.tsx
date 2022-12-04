import { createReactRouter, createRouteConfig } from '@tanstack/react-router';

import { Home } from '../screens/home';
import { Player } from '../screens/player';
import { Upload } from '../screens/upload';
import { About } from '../screens/about';
import { Profile } from '../screens/profile';

import { RootLayout } from '../components/layouts/root-layout';

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}

const rootRoute = createRouteConfig({
  component: RootLayout,
});

const indexRoute = rootRoute.createRoute({
  id: 'home',
  path: '/',
  component: Home,
});

const playerRoute = rootRoute.createRoute({
  id: 'player',
  path: '/player',
  component: Player,
});

const uploadRoute = rootRoute.createRoute({
  id: 'upload',
  path: '/upload',
  component: Upload,
});

const aboutRoute = rootRoute.createRoute({
  id: 'about',
  path: '/about',
  component: About,
});

const profileRoute = rootRoute.createRoute({
  id: 'profile',
  path: '/profile',
  component: Profile,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  playerRoute,
  uploadRoute,
  aboutRoute,
  profileRoute,
]);

export const router = createReactRouter({ routeConfig });
