import SalesOrdersList from '~/pages/sales/orders/orders-list';
import SalesOrdersUpdatePage from '~/pages/sales/orders/orders-update';
import SalesEnquiryList from '~/pages/sales/enquiry/enquiry-list';
import SalesEnquiryUpdatePage from '~/pages/sales/enquiry/enquiry-update';
import SalesSubscriptionList from '~/pages/sales/subscription/subscription-list';

import PATH from '../path';
import {
  SALE_ENQUIRY_PERMISSION_KEY,
  SALE_ORDER_PERMISSION_KEY,
} from '~/constants/permissions';

export const optionsSales = [
  {
    name: 'Sales',
    isMenu: true,
    isTitleGroup: true,
    isTitle: true,
    rules: [SALE_ENQUIRY_PERMISSION_KEY, SALE_ORDER_PERMISSION_KEY],
  },
  {
    path: PATH.SALES_ORDERS,
    name: 'Orders',
    component: SalesOrdersList,
    isMenu: true,
    rules: [SALE_ORDER_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Orders',
          path: PATH.SALES_ORDERS,
        },
      ],
    },
  },
  {
    path: PATH.SALES_ORDERS_UPDATE,
    component: SalesOrdersUpdatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Orders',
          path: PATH.SALES_ORDERS,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },

  {
    path: PATH.SALES_ENQUIRY,
    name: 'Enquiry',
    component: SalesEnquiryList,
    isMenu: true,
    rules: [SALE_ENQUIRY_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Enquiry',
          path: PATH.SALES_ENQUIRY,
        },
      ],
    },
  },
  {
    path: PATH.SALES_ENQUIRY_UPDATE,
    component: SalesEnquiryUpdatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Enquiry',
          path: PATH.SALES_ENQUIRY,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },

  {
    path: PATH.SALES_SUBSCRIPTION,
    name: 'Subcription',
    component: SalesSubscriptionList,
    isMenu: true,
    rules: [SALE_ENQUIRY_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Subcription',
          path: PATH.SALES_SUBSCRIPTION,
        },
      ],
    },
  },
];
