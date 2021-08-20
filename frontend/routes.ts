import { Route } from '@vaadin/router';
import './views/addemployee/add-employee-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'add-employee-view',
    icon: '',
    title: '',
  },
  {
    path: 'add-employee',
    component: 'add-employee-view',
    icon: 'la la-user-plus',
    title: 'Add Employee',
  },
  {
    path: 'employees',
    component: 'employees-view',
    icon: 'la la-users',
    title: 'Employees',
    action: async (_context, _command) => {
      await import('./views/employees/employees-view');
      return;
    },
  },
  {
    path: 'about',
    component: 'about-view',
    icon: 'la la-file',
    title: 'About',
    action: async (_context, _command) => {
      await import('./views/about/about-view');
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
