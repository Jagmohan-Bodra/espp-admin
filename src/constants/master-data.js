export const BLOCK_STATUS = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
};

export const BLOCK_TYPE = {
  THEME: 'THEME',
  FOR_BLOCK: 'FOR_BLOCK',
  FIXED: 'FIXED',
  BASIC: 'BASIC',
  CUSTOMIZE: 'CUSTOMIZE',
};

export const PROMOTIONS_TYPE = {
  PERCENTAGE: 'Percentage',
  CASH_REBATE: 'Cash Rebate',
  FREE_SHIPPING: 'Free Shipping',
};

export const PROMOTIONS_TYPE_OPTION = [
  {key: 'PERCENTAGE', value: 'Percentage', name: 'Percentage'},
  {key: 'CASH_REBATE', value: 'Cash Rebate', name: 'Cash Rebate'},
  {key: 'FREE_SHIPPING', value: 'Free Shipping', name: 'Free Shipping'},
];

export const ENQUIRY_STATUS = {
  OPEN: 'Open',
  QUOTATION_SENT: 'Quotation Sent',
  WON: 'Won',
  LOST: 'Lost',
  CLOSED: 'Closed',
};

export const ENQUIRY_STATUS_MASTERDATA = {
  OPEN: 'OPEN',
  QUOTATION_SENT: 'QUOTATION_SENT',
  WON: 'WON',
  LOST: 'LOST',
  CLOSED: 'CLOSED',
};

export const ENQUIRY_STATUS_OPTION = [
  {key: 'OPEN', value: 'Open'},
  {key: 'QUOTATION_SENT', value: 'Quotation Sent'},
  {key: 'WON', value: 'Won'},
  {key: 'LOST', value: 'Lost'},
  {key: 'CLOSED', value: 'Closed'},
];

export const ENQUIRY_REASON_OPTION = [
  {key: 'TOO_EXPENSIVE', value: 'Too Expensive'},
  {key: 'DONT_HAVE_PEOPLE', value: "We don't have people/ skill"},
  {key: 'NOT_ENOUGH_STOCK', value: 'Not enough stock'},
  {key: 'PRICE_TOO_HIGH', value: 'Maybe Price is too high'},
  {key: 'NOT_A_GOOD_DEAL', value: 'Looks not a good deal'},
  {key: 'COVID_19', value: 'Covid 19'},
  {key: 'DUPLICATE_DEAL', value: 'Duplicate deal'},
  {key: 'DESIGN_IS_NOT_GOOD', value: 'Design is not good enough'},
  {key: 'MISS_DEADLINE', value: 'Miss Deadline'},
  {key: 'NO_RESPONSE_FOR_A_LONG_TIME', value: 'No response for a long time'},
];

export const ORDERS_STATUS_OPTION = [
  {key: 'PENDING', value: 'Pending'},
  {key: 'PROCESSING', value: 'Processing'},
  {key: 'READY_TO_SHIP', value: 'Ready to Ship'},
  {key: 'COMPLETED', value: 'Completed'},
  {key: 'CANCELLED', value: 'Cancelled'},
];

export const ORDERS_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  READY_TO_SHIP: 'READY_TO_SHIP',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const PROMOTION_APPLYFOR = {
  SPECIAL_PRODUCTS: 'Special product',
  ALL_PRODUCTS: 'All products',
};

export const PROMOTION_APPLYFOR_OPTION = [
  {
    key: 'SPECIAL_PRODUCTS',
    value: 'Special product',
    name: 'Special product',
  },
  {key: 'ALL_PRODUCTS', value: 'All products', name: 'All products'},
];

export const PRODUCT_STATUS = {
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
};

export const BRAND_STATUS = {
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
};

export const COLOR_STATUS = {
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
};

export const TAG_STATUS = {
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
};

export const CATEGORY_STATUS = {
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
};

export const POST_CATEGORY_STATUS = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
};

export const STATUS = {
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
};

export const STATUS_OPTION = [
  {key: 'ENABLED', name: 'Enabled'},
  {key: 'DISABLED', name: 'Disabled'},
];

export const CUSTOMER_STATUS = {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  SUSPEND: 'Suspend',
};

export const CUSTOMER_STATUS_NEW = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPEND: 'SUSPEND',
};

export const STATUS_CUSTOMER = {
  Pending: 'PENDING',
  Active: 'ACTIVE',
  Suspend: 'SUSPEND',
};

export const CUSTOMER_STATUS_OPTION = [
  {key: 'PENDING', name: 'Pending'},
  {key: 'ACTIVE', name: 'Active'},
  {key: 'SUSPEND', name: 'Suspend'},
];

export const ACCOUNT_TYPES = [
  {key: 'PERSONAL', name: 'Personal'},
  {key: 'CORPORATE', name: 'Corporate'},
];

export const USER_GENDER = {
  MALE: 'Male',
  FEMALE: 'Female',
};

export const USER_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'InActive',
};

export const PAGE_SIZE_TYPE = {
  PC: 'PC',
  LAPTOP: 'LAPTOP',
  TABLET: 'TABLET',
  MOBILE: 'MOBILE',
};

export const COLOR = {
  GREY: '#cccccc',
  PINK_DARK: '#d90063',
  PINK_LIGHT: '#f5c0d2',
};

export const PAGE_SIZE_OPTION = {
  [PAGE_SIZE_TYPE.PC]: {
    id: PAGE_SIZE_TYPE.PC,
    classNameButton: 'pc',
    text: 'Laptop L - 1440px',
    size: 1440,
  },
  [PAGE_SIZE_TYPE.LAPTOP]: {
    id: PAGE_SIZE_TYPE.LAPTOP,
    classNameButton: 'laptop',
    text: 'Laptop - 1024px',
    size: 1024,
  },
  [PAGE_SIZE_TYPE.TABLET]: {
    id: PAGE_SIZE_TYPE.TABLET,
    classNameButton: 'tablet',
    text: 'Tablet - 768px',
    size: 768,
  },
  [PAGE_SIZE_TYPE.MOBILE]: {
    id: PAGE_SIZE_TYPE.MOBILE,
    classNameButton: 'mobile-m',
    text: 'Mobile M - 375px',
    size: 375,
  },
};

export const GENDER_DATA = [
  {
    key: 'MALE',
    value: 'Male',
  },
  {
    key: 'FEMALE',
    value: 'Female',
  },
];

export const SALUTATIONS = [
  {key: 'MR', name: 'Mr'},
  {key: 'MRS', name: 'Mrs'},
  {key: 'MS', name: 'Ms'},
  {key: 'MDM', name: 'Mdm'},
  {key: 'DR', name: 'Dr'},
];

export const BLOCK_STATUS_OPTION = [
  {
    key: BLOCK_STATUS.ENABLED,
    name: 'Enabled',
  },
  {
    key: BLOCK_STATUS.DISABLED,
    name: 'Disabled',
  },
];

export const PROMOTION_STATUS_OPTION = [
  {
    key: 'ENABLED',
    name: 'Enabled',
  },
  {
    key: 'DISABLED',
    name: 'Disabled',
  },
];

export const BRAND_STATUS_OPTION = [
  {
    key: BRAND_STATUS.ENABLED,
    name: 'Enable',
  },
  {
    key: BRAND_STATUS.DISABLED,
    name: 'Disabled',
  },
];

export const CATEGORY_STATUS_OPTION = [
  {
    key: CATEGORY_STATUS.ENABLED,
    name: 'Enable',
  },
  {
    key: CATEGORY_STATUS.DISABLED,
    name: 'Disabled',
  },
];

export const COLOR_STATUS_OPTION = [
  {
    key: COLOR_STATUS.ENABLED,
    name: 'Enable',
  },
  {
    key: COLOR_STATUS.DISABLED,
    name: 'Disabled',
  },
];

export const TAG_STATUS_OPTION = [
  {
    key: TAG_STATUS.ENABLED,
    name: 'Enable',
  },
  {
    key: TAG_STATUS.DISABLED,
    name: 'Disabled',
  },
];

export const PRODUCT_STATUS_OPTION = [
  {
    key: PRODUCT_STATUS.ENABLED,
    name: 'Enable',
  },
  {
    key: PRODUCT_STATUS.DISABLED,
    name: 'Disabled',
  },
];

export const CURRENCY_COUNTRIES = [
  {
    key: 'us',
    value: 'United States Dollar (USD)',
  },
  {
    key: 'sg',
    value: 'Singapore Dollar (SGD)',
  },
];

export const CURRENCY_STATUS = [
  {
    key: 'active',
    value: 'Active',
  },
  {
    key: 'inactive',
    value: 'Inactive',
  },
];

export const PAGE_TYPE = {
  CONTENT: 'CONTENT',
  FUNCTION: 'FUNCTION',
  PRODUCT: 'PRODUCT',
  BLOG: 'BLOG',
};

export const PAGE_TYPE_OPTION = [
  {
    key: PAGE_TYPE.CONTENT,
    value: 'Content',
  },
  {
    key: PAGE_TYPE.FUNCTION,
    value: 'Function',
  },
  {
    key: PAGE_TYPE.PRODUCT,
    value: 'Product',
  },
  {
    key: PAGE_TYPE.BLOG,
    value: 'Blog',
  },
];

export const BLOCK_TYPE_OPTION = [
  {
    key: BLOCK_TYPE.BASIC,
    value: 'Basic',
  },
  {
    key: BLOCK_TYPE.CUSTOMIZE,
    value: 'Customize',
  },
  {
    key: BLOCK_TYPE.FIXED,
    value: 'Fixed',
  },
  {
    key: BLOCK_TYPE.FOR_BLOCK,
    value: 'For block',
  },
  {
    key: BLOCK_TYPE.THEME,
    value: 'Theme',
  },
];

export const VARIANT_TYPE = {
  RICHTEXT: 'RICHTEXT',
  PHOTO: 'PHOTO',
  GALLERY: 'GALLERY',
  PRODUCT_LIST: 'PRODUCT_LIST',
  POST_LIST: 'POST_LIST',
  TREE: 'TREE',
  TEXT: 'TEXT',
};
