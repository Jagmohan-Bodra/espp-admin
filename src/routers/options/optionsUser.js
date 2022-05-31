//Admin
import UserList from '~/pages/users/user/user-list';
import UserProfile from '~/pages/users/user/user-profile';
import UserUpdatePage from '~/pages/users/user/user-update';
import UserCreatePage from '~/pages/users/user/user-create';

import RoleList from '~/pages/users/role/role-list';
import RoleUpdatePage from '~/pages/users/role/role-update';
import RoleCreatePage from '~/pages/users/role/role-create';

import PATH from '../path';
import {
  USER_PERMISSION_KEY,
  USER_ROLE_PERMISSION_KEY,
} from '~/constants/permissions';

export const optionsUser = [
  {
    name: 'Users',
    isMenu: true,
    isTitleGroup: true,
    isTitle: true,
    rules: [USER_PERMISSION_KEY, USER_ROLE_PERMISSION_KEY],
  },
  {
    path: PATH.ADMIN_PROFILE,
    name: 'Profile',
    component: UserProfile,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Profile',
          path: PATH.ADMIN_PROFILE,
        },
      ],
    },
  },
  {
    path: PATH.ADMIN_USER,
    name: 'Users',
    component: UserList,
    isMenu: true,
    rules: [USER_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Users',
          path: PATH.ADMIN_USER,
        },
      ],
    },
  },
  {
    path: PATH.ADMIN_USER_CREATE,
    component: UserCreatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Users',
          path: PATH.ADMIN_USER,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.ADMIN_USER_UPDATE,
    component: UserUpdatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Users',
          path: PATH.ADMIN_USER,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },

  // Role
  {
    path: PATH.ADMIN_ROLE,
    name: 'Roles',
    component: RoleList,
    isMenu: true,
    rules: [USER_ROLE_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Roles',
          path: PATH.ADMIN_ROLE,
        },
      ],
    },
  },
  {
    path: PATH.ADMIN_ROLE_CREATE,
    component: RoleCreatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Roles',
          path: PATH.ADMIN_ROLE,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.ADMIN_ROLE_UPDATE,
    component: RoleUpdatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Roles',
          path: PATH.ADMIN_ROLE,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
];
