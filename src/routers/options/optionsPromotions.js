import PromotionsList from '~/pages/promotions/promotions-list';
import PromotionsCreate from '~/pages/promotions/promotions-create';
import PromotionsUpdate from '~/pages/promotions/promotions-update';

import PATH from '../path';
import {PROMOTION_PERMISSION_KEY} from '~/constants/permissions';

export const optionsPromotions = [
  {
    name: 'Promotions',
    isMenu: true,
    rules: [PROMOTION_PERMISSION_KEY],
    isTitleGroup: true,
    isTitle: true,
  },
  {
    path: PATH.PROMOTIONS,
    name: 'Promotions',
    component: PromotionsList,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Promotions',
          path: PATH.PROMOTIONS,
        },
      ],
    },
  },
  {
    path: PATH.PROMOTIONS_CREATE,
    component: PromotionsCreate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Products',
          path: PATH.PROMOTIONS,
        },
        {
          name: 'Add new',
          path: '#',
        },
      ],
    },
  },
  {
    path: PATH.PROMOTIONS_UPDATE,
    component: PromotionsUpdate,
    isMenu: false,
    menu: {
      header: [
        {
          name: 'Promotions',
          path: PATH.PROMOTIONS,
        },
        {
          name: 'Update #:id',
          path: '#',
        },
      ],
    },
  },
];
