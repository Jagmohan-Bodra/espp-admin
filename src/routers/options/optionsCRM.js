//Admin
import CustomerList from '~/pages/crm/customer/customer-list';
import CustomerUpdate from '~/pages/crm/customer/customer-update';
import CustomerCreate from '~/pages/crm/customer/customer-create';

import MembershipList from '~/pages/crm/membership/membership-list';
import MembershipUpdate from '~/pages/crm/membership/membership-update';
import MembershipCreate from '~/pages/crm/membership/membership-create';
import PATH from '../path';
import {
  CRM_CUSTOMER_PERMISSION_KEY,
  CRM_MEMBERSHIP_PERMISSION_KEY,
} from '~/constants/permissions';

export const optionsCRM = [
  {
    name: 'CRM',
    isMenu: true,
    isTitleGroup: true,
    isTitle: true,
    rules: [CRM_CUSTOMER_PERMISSION_KEY, CRM_MEMBERSHIP_PERMISSION_KEY],
  },
  {
    path: PATH.CRM_CUSTOMER,
    name: 'Customers',
    component: CustomerList,
    isMenu: true,
    rules: [CRM_CUSTOMER_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Customers',
          path: PATH.CRM_CUSTOMER,
        },
      ],
    },
  },
  {
    path: PATH.CRM_CUSTOMER_CREATE,
    component: CustomerCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Customers',
          path: PATH.CRM_CUSTOMER,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CRM_CUSTOMER_UPDATE,
    component: CustomerUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Customers',
          path: PATH.CRM_CUSTOMER,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },

  // Membership
  {
    path: PATH.CRM_MEMBERSHIP,
    name: 'Membership',
    component: MembershipList,
    isMenu: true,
    rules: [CRM_MEMBERSHIP_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Membership',
          path: PATH.CRM_MEMBERSHIP,
        },
      ],
    },
  },
  {
    path: PATH.CRM_MEMBERSHIP_CREATE,
    component: MembershipCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Membership',
          path: PATH.CRM_MEMBERSHIP,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CRM_MEMBERSHIP_UPDATE,
    component: MembershipUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Membership',
          path: PATH.CRM_MEMBERSHIP,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
];
