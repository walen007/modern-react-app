import { lazy } from 'react';

interface IRoute {
  path: string;
  exact: boolean;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}

const Home = lazy(() => import('@pages/home'));
const NotFound = lazy(() => import('@pages/not-found'));

export const routes: IRoute[] = [
  { path: '/', exact: true, Component: Home },
  { path: '*', exact: false, Component: NotFound },
];
