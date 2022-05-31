//Product
import ProductList from '~/pages/inventory/product/product-list';
import ProductUpdate from '~/pages/inventory/product/product-update';
import ProductCreate from '~/pages/inventory/product/product-create';

import BrandList from '~/pages/inventory/brand/brand-list';
import BrandUpdate from '~/pages/inventory/brand/brand-update';
import BrandCreate from '~/pages/inventory/brand/brand-create';

import CategoryList from '~/pages/inventory/category/category-list';
import CategoryUpdate from '~/pages/inventory/category/category-update';
import CategoryCreate from '~/pages/inventory/category/category-create';

import TagList from '~/pages/inventory/tag/tag-list';
import TagUpdate from '~/pages/inventory/tag/tag-update';
import TagCreate from '~/pages/inventory/tag/tag-create';

import ColorList from '~/pages/inventory/color/color-list';
import ColorUpdate from '~/pages/inventory/color/color-update';
import ColorCreate from '~/pages/inventory/color/color-create';

import PATH from '../path';
import {
  INVENTORY_BRAND_PERMISSION_KEY,
  INVENTORY_COLOR_PERMISSION_KEY,
  INVENTORY_PRODUCT_CATEGORY_PERMISSION_KEY,
  INVENTORY_PRODUCT_PERMISSION_KEY,
  INVENTORY_TAG_PERMISSION_KEY,
} from '~/constants/permissions';

export const optionsInventory = [
  {
    name: 'Inventory',
    isMenu: true,
    isTitleGroup: true,
    isTitle: true,
    rules: [
      INVENTORY_BRAND_PERMISSION_KEY,
      INVENTORY_COLOR_PERMISSION_KEY,
      INVENTORY_PRODUCT_CATEGORY_PERMISSION_KEY,
      INVENTORY_PRODUCT_PERMISSION_KEY,
      INVENTORY_TAG_PERMISSION_KEY,
    ],
  },
  // Product
  {
    path: PATH.INVENTORY_PRODUCT,
    name: 'Products',
    component: ProductList,
    isMenu: true,
    rules: [INVENTORY_PRODUCT_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Products',
          path: PATH.INVENTORY_PRODUCT,
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_PRODUCT_CREATE,
    component: ProductCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Products',
          path: PATH.INVENTORY_PRODUCT,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_PRODUCT_UPDATE,
    component: ProductUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Products',
          path: PATH.INVENTORY_PRODUCT,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
  // Brand
  {
    path: PATH.INVENTORY_BRAND,
    name: 'Brands',
    component: BrandList,
    isMenu: true,
    rules: [INVENTORY_BRAND_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Brands',
          path: PATH.INVENTORY_BRAND,
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_BRAND_CREATE,
    component: BrandCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Brands',
          path: PATH.INVENTORY_BRAND,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_BRAND_UPDATE,
    component: BrandUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Brands',
          path: PATH.INVENTORY_BRAND,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
  // Category
  {
    path: PATH.INVENTORY_CATEGORY,
    name: 'Categories',
    component: CategoryList,
    isMenu: true,
    rules: [INVENTORY_PRODUCT_CATEGORY_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Categories',
          path: PATH.INVENTORY_CATEGORY,
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_CATEGORY_CREATE,
    component: CategoryCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Categories',
          path: PATH.INVENTORY_CATEGORY,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_CATEGORY_UPDATE,
    component: CategoryUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Categories',
          path: PATH.INVENTORY_CATEGORY,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
  // Color
  {
    path: PATH.INVENTORY_COLOR,
    name: 'Colors',
    component: ColorList,
    isMenu: true,
    rules: [INVENTORY_COLOR_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Colors',
          path: PATH.INVENTORY_COLOR,
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_COLOR_CREATE,
    component: ColorCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Colors',
          path: PATH.INVENTORY_COLOR,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_COLOR_UPDATE,
    component: ColorUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Colors',
          path: PATH.INVENTORY_COLOR,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
  // Tag
  {
    path: PATH.INVENTORY_TAG,
    name: 'Tags',
    component: TagList,
    isMenu: true,
    rules: [INVENTORY_TAG_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Tags',
          path: PATH.INVENTORY_TAG,
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_TAG_CREATE,
    component: TagCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Tags',
          path: PATH.INVENTORY_TAG,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.INVENTORY_TAG_UPDATE,
    component: TagUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Tags',
          path: PATH.INVENTORY_TAG,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
];
