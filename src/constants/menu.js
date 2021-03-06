import PATH from '~/routers/path';
import {
  CMS_BLOCK_PERMISSION_KEY,
  CMS_PAGE_PERMISSION_KEY,
  CMS_POST_CATEGORY_PERMISSION_KEY,
  CMS_POST_PERMISSION_KEY,
  CMS_THEME_PERMISSION_KEY,
  CRM_CUSTOMER_PERMISSION_KEY,
  CRM_MEMBERSHIP_PERMISSION_KEY,
  DASHBOARD_PERMISSION_KEY,
  INVENTORY_BRAND_PERMISSION_KEY,
  INVENTORY_COLOR_PERMISSION_KEY,
  INVENTORY_PRODUCT_CATEGORY_PERMISSION_KEY,
  INVENTORY_PRODUCT_PERMISSION_KEY,
  INVENTORY_TAG_PERMISSION_KEY,
  PROMOTION_PERMISSION_KEY,
  REPORT_PERMISSION_KEY,
  SALE_ENQUIRY_PERMISSION_KEY,
  SALE_ORDER_PERMISSION_KEY,
  SETTING_PERMISSION_KEY,
  USER_PERMISSION_KEY,
  USER_ROLE_PERMISSION_KEY,
} from './permissions';

export const MENU_ICONS = [
  {
    name: 'Dashboard',
    icon: require('~/public/assets/icon/square-4.svg'),
    link: PATH.DASHBOARD,
    rules: [DASHBOARD_PERMISSION_KEY],
  },
  {
    name: 'User',
    icon: require('~/public/assets/icon/user.svg'),
    link: PATH.ADMIN_USER,
    rules: [USER_PERMISSION_KEY, USER_ROLE_PERMISSION_KEY],
  },
  {
    name: 'Settings',
    icon: require('~/public/assets/icon/settings.svg'),
    link: PATH.SETTING,
    rules: [SETTING_PERMISSION_KEY],
  },
  {
    name: 'Reports',
    icon: require('~/public/assets/icon/contract.svg'),
    link: PATH.REPORTS,
    rules: [REPORT_PERMISSION_KEY],
  },
  {
    name: 'CMS',
    icon: require('~/public/assets/icon/content.svg'),
    link: PATH.CMS_PAGES,
    rules: [
      CMS_BLOCK_PERMISSION_KEY,
      CMS_PAGE_PERMISSION_KEY,
      CMS_POST_CATEGORY_PERMISSION_KEY,
      CMS_POST_PERMISSION_KEY,
      CMS_THEME_PERMISSION_KEY,
    ],
  },
  {
    name: 'CRM',
    icon: require('~/public/assets/icon/crm.svg'),
    link: PATH.CRM,
    rules: [CRM_CUSTOMER_PERMISSION_KEY, CRM_MEMBERSHIP_PERMISSION_KEY],
  },
  {
    name: 'Sales',
    icon: require('~/public/assets/icon/sales.svg'),
    link: PATH.SALES,
    rules: [SALE_ENQUIRY_PERMISSION_KEY, SALE_ORDER_PERMISSION_KEY],
  },
  {
    name: 'Inventory',
    icon: require('~/public/assets/icon/shipping.svg'),
    link: PATH.INVENTORY,
    rules: [
      INVENTORY_BRAND_PERMISSION_KEY,
      INVENTORY_COLOR_PERMISSION_KEY,
      INVENTORY_PRODUCT_CATEGORY_PERMISSION_KEY,
      INVENTORY_PRODUCT_PERMISSION_KEY,
      INVENTORY_TAG_PERMISSION_KEY,
    ],
  },
  {
    name: 'Promotion',
    icon: require('~/public/assets/icon/discount.svg'),
    link: PATH.PROMOTIONS,
    rules: [PROMOTION_PERMISSION_KEY],
  },
];
