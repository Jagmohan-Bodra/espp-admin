import {DASHBOARD_PERMISSION_KEY} from '~/constants/permissions';
import Dashboard from '~/pages/dashboard';
import PATH from '../path';

export const optionsDashboard = [
  {
    name: 'Dashboard',
    isMenu: true,
    isTitleGroup: true,
    isTitle: true,
    rules: [DASHBOARD_PERMISSION_KEY],
  },
  {
    path: PATH.DASHBOARD,
    name: 'Dashboard',
    component: Dashboard,
    rules: [DASHBOARD_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Dashboard',
          path: PATH.DASHBOARD,
        },
      ],
    },
  },
];
