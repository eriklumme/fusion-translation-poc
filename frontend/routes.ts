import { Route } from '@vaadin/router';
import './views/addemployee/add-employee-view';
import './views/main-layout';
import { get } from 'lit-translate';

export type ViewRoute = Route & {
  titleKey?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'add-employee-view',
    icon: '',
    titleKey: '',
  },
  {
    path: 'add-employee',
    component: 'add-employee-view',
    icon: 'la la-user-plus',
    titleKey: 'addemployee.caption',
  },
  {
    path: 'about',
    component: 'about-view',
    icon: 'la la-file',
    titleKey: 'about.caption',
    action: async (_context, _command) => {
      await import('./views/about/about-view');
      return;
    },
  },
  {
    path: 'not-translated',
    component: 'not-translated-view',
    icon: 'la la-land',
    titleKey: 'nottranslated.caption',
    action: async (_context, _command) => {
      await import('./views/nottranslated/not-translated-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
