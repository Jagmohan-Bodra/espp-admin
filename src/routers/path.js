export default {
  //guest
  ROOT: '/',

  ADMIN_LOGIN_SCREEN: '/sign-in',
  LOGIN_SCREEN: '/sign-in',
  FORGET_PASSWORD: '/forget-password',

  DASHBOARD: '/dashboard',
  SETTING: '/settings',
  REPORTS: '/reports',
  SALES: '/sales/orders',

  //User
  ADMIN_USER: '/users/lists',
  ADMIN_USER_CREATE: '/users/list/create',
  ADMIN_USER_UPDATE: '/users/list/update/:id',
  ADMIN_USER_GET_PASSWORD: '/users/list/get-password',
  ADMIN_PROFILE: '/user/profile',

  //Role
  ADMIN_ROLE: '/users/roles',
  ADMIN_ROLE_CREATE: '/users/role/create',
  ADMIN_ROLE_UPDATE: '/users/role/update/:id',

  //--CMS
  //----themes
  CMS_THEMES: '/cms/themes',
  CMS_THEMES_CREATE: '/cms/theme/create',
  CMS_THEMES_UPDATE: '/cms/theme/update/:id',
  CMS_THEMES_UPDATE_UI: '/cms/theme/update-ui/:id',

  //----pages
  CMS_SITE_PAGES: '/cms/site/:siteid/pages',
  CMS_PAGES: '/cms/pages',
  CMS_PAGES_CREATE: '/cms/page/create',
  CMS_PAGES_UPDATE_UI: '/cms/page/update-ui/:id',
  CMS_PAGES_UPDATE_PROPERTIES: '/cms/page/update-properties/:id',

  //----posts
  CMS_POSTS: '/cms/posts',
  CMS_POSTS_CREATE: '/cms/post/create',
  CMS_POSTS_UPDATE: '/cms/post/update/:id',

  //----blocks
  CMS_BLOCKS: '/cms/blocks',
  CMS_BLOCKS_CREATE: '/cms/block/create',
  CMS_BLOCKS_UPDATE: '/cms/block/update/:id',
  CMS_BLOCKS_UPDATE_UI: '/cms/block/update-ui/:id',

  //----categorys
  CMS_CATEGORY_POSTS: '/cms/categorys',
  CMS_CATEGORY_POSTS_CREATE: '/cms/category/create',
  CMS_CATEGORY_POSTS_UPDATE: '/cms/category/update/:id',

  CMS_SEO_SETTINGS: '/cms/seo-settings',
  CMS_SEO_SETTINGS_UPDATE: '/cms/seo-setting/update/:id',

  CMS_BLOCK_PAGES: '/cms/block-pages',
  CMS_BLOCK_PAGE_UPDATE: '/cms/block-page/update/:id',

  CRM: '/crm/customers',
  //customers
  CRM_CUSTOMER: '/crm/customers',
  CRM_CUSTOMER_CREATE: '/crm/customer/create',
  CRM_CUSTOMER_UPDATE: '/crm/customer/update/:id',

  //memberships
  CRM_MEMBERSHIP: '/crm/memberships',
  CRM_MEMBERSHIP_CREATE: '/crm/membership/create',
  CRM_MEMBERSHIP_UPDATE: '/crm/membership/update/:id',

  INVENTORY: '/inventory/products',
  //Product
  INVENTORY_PRODUCT: '/inventory/products',
  INVENTORY_PRODUCT_CREATE: '/inventory/product/create',
  INVENTORY_PRODUCT_UPDATE: '/inventory/product/update/:id',

  //brand
  INVENTORY_BRAND: '/inventory/brands',
  INVENTORY_BRAND_CREATE: '/inventory/brand/create',
  INVENTORY_BRAND_UPDATE: '/inventory/brand/update/:id',

  //Category
  INVENTORY_CATEGORY: '/inventory/categorys',
  INVENTORY_CATEGORY_CREATE: '/inventory/category/create',
  INVENTORY_CATEGORY_UPDATE: '/inventory/category/update/:id',

  //tag
  INVENTORY_TAG: '/inventory/tags',
  INVENTORY_TAG_CREATE: '/inventory/tag/create',
  INVENTORY_TAG_UPDATE: '/inventory/tag/update/:id',

  //color
  INVENTORY_COLOR: '/inventory/colors',
  INVENTORY_COLOR_CREATE: '/inventory/color/create',
  INVENTORY_COLOR_UPDATE: '/inventory/color/update/:id',

  //ADMIN_NOTIFICATION
  ADMIN_NOTIFICATION: '/admin/notifications',
  ADMIN_NOTIFICATION_CREATE: '/admin/notification-create',
  ADMIN_NOTIFICATION_UPDATE: '/admin/notification/update/:id',

  //SALES_ORDERS
  SALES_ORDERS: '/sales/orders',
  SALES_ORDERS_CREATE: '/sales/order-create',
  SALES_ORDERS_UPDATE: '/sales/order/update/:id',

  //SALES_ENQUIRY
  SALES_ENQUIRY: '/sales/enquiries',
  SALES_ENQUIRY_CREATE: '/sales/enquiry-create',
  SALES_ENQUIRY_UPDATE: '/sales/enquiry/update/:id',

  //SALES_SUBSCRIPTION
  SALES_SUBSCRIPTION: '/sales/subscription',

  //PROMOTIONS
  PROMOTIONS: '/promotions/list',
  PROMOTIONS_CREATE: '/promotions/create',
  PROMOTIONS_UPDATE: '/promotions/update/:id',
  APPROVAL_PAGE: '/approval-page',
};
