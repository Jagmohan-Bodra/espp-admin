import PageList from '~/pages/cms/page/page-list';
import PageUpdateProperties from '~/pages/cms/page/page-update-properties';
import PageUpdateUI from '~/pages/cms/page/page-update-ui';
import PageCreate from '~/pages/cms/page/page-create';

import PostList from '~/pages/cms/post/post-list';
import PostUpdatePage from '~/pages/cms/post/post-update';
import PostCreatePage from '~/pages/cms/post/post-create';

import ThemeList from '~/pages/cms/theme/theme-list';
import ThemeUpdatePage from '~/pages/cms/theme/theme-update';
import ThemeCreatePage from '~/pages/cms/theme/theme-create';
import ThemeCmsPage from '~/pages/cms/theme/theme-cms';

import CategoryList from '~/pages/cms/post-category/category-list';
import CategoryUpdatePage from '~/pages/cms/post-category/category-update';
import CategoryCreatePage from '~/pages/cms/post-category/category-create';

import PATH from '../path';
import {
  CMS_BLOCK_PERMISSION_KEY,
  CMS_PAGE_PERMISSION_KEY,
  CMS_POST_CATEGORY_PERMISSION_KEY,
  CMS_POST_PERMISSION_KEY,
  CMS_THEME_PERMISSION_KEY,
} from '~/constants/permissions';

export const optionsCMS = [
  {
    name: 'CMS',
    isMenu: true,
    isTitleGroup: true,
    isTitle: true,
    rules: [
      CMS_BLOCK_PERMISSION_KEY,
      CMS_PAGE_PERMISSION_KEY,
      CMS_POST_CATEGORY_PERMISSION_KEY,
      CMS_POST_PERMISSION_KEY,
      CMS_THEME_PERMISSION_KEY,
    ],
  },

  // Page
  {
    path: PATH.CMS_PAGES,
    name: 'Pages',
    component: PageList,
    isMenu: true,
    rules: [CMS_PAGE_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Pages',
          path: PATH.CMS_PAGES,
        },
      ],
    },
  },
  {
    path: PATH.CMS_PAGES_CREATE,
    component: PageCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Pages',
          path: PATH.CMS_PAGES,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CMS_PAGES_UPDATE_UI,
    component: PageUpdateUI,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Pages',
          path: PATH.CMS_PAGES,
        },
        {
          name: 'Update UI #:id',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CMS_PAGES_UPDATE_PROPERTIES,
    component: PageUpdateProperties,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Pages',
          path: PATH.CMS_PAGES,
        },
        {
          name: 'Update Properties #:id',
          path: '#',
        },
      ],
    },
  },

  // Posts
  {
    path: PATH.CMS_POSTS,
    name: 'Posts',
    component: PostList,
    isMenu: true,
    rules: [CMS_POST_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Posts',
          path: PATH.CMS_POSTS,
        },
      ],
    },
  },
  {
    path: PATH.CMS_POSTS_CREATE,
    component: PostCreatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Posts',
          path: PATH.CMS_POSTS,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CMS_POSTS_UPDATE,
    component: PostUpdatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Posts',
          path: PATH.CMS_POSTS,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },

  // Post Category
  {
    path: PATH.CMS_CATEGORY_POSTS,
    name: 'Post Category',
    component: CategoryList,
    isMenu: true,
    rules: [CMS_POST_CATEGORY_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Post Category',
          path: PATH.CMS_CATEGORY_POSTS,
        },
      ],
    },
  },
  {
    path: PATH.CMS_CATEGORY_POSTS_CREATE,
    component: CategoryCreatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Post Category',
          path: PATH.CMS_CATEGORY_POSTS,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CMS_CATEGORY_POSTS_UPDATE,
    component: CategoryUpdatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Post Category',
          path: PATH.CMS_CATEGORY_POSTS,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
  // Theme
  {
    path: PATH.CMS_THEMES,
    name: 'Themes',
    component: ThemeList,
    isMenu: true,
    rules: [CMS_THEME_PERMISSION_KEY],
    menu: {
      header: [
        {
          name: 'Themes',
          path: PATH.CMS_THEMES,
        },
      ],
    },
  },
  {
    path: PATH.CMS_THEMES_CREATE,
    component: ThemeCreatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Themes',
          path: PATH.CMS_THEMES,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CMS_THEMES_UPDATE,
    component: ThemeUpdatePage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Themes',
          path: PATH.CMS_THEMES,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.CMS_THEMES_UPDATE_UI,
    component: ThemeCmsPage,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Pages',
          path: PATH.CMS_THEMES,
        },
        {
          name: 'Update UI #:id',
          path: '#',
        },
      ],
    },
  },
];
