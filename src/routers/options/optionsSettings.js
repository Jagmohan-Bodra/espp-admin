import {SETTING_PERMISSION_KEY} from '~/constants/permissions';
import Settings from '~/pages/settings';
import PATH from '../path';

export const optionsSettings = [
  {
    name: 'Settings',
    isMenu: true,
    isTitleGroup: true,
    isTitle: true,
    rules: [SETTING_PERMISSION_KEY],
  },
  {
    path: PATH.SETTING,
    name: 'Settings',
    component: Settings,
    menu: {
      header: [
        {
          name: 'Settings',
          path: PATH.SETTING,
        },
      ],
    },
  },
];
