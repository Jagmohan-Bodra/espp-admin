import LoginPage from '~/pages/auth/Login';
import ForgetPasswordPage from '~/pages/auth/ForgetPassword';
import ApprovalPage from '~/pages/approval';

import {optionsDashboard} from './optionsDashboard';
import {optionsUser} from './optionsUser';
import {optionsSettings} from './optionsSettings';
import {optionsCMS} from './optionsCMS';
import {optionsCRM} from './optionsCRM';
import {optionsInventory} from './optionsInventory';
import {optionsSales} from './optionsSales';
import {optionsPromotions} from './optionsPromotions';
import PATH from '../path';

export const adminLayoutOptions = [
  ...optionsDashboard,
  ...optionsUser,
  ...optionsCMS,
  ...optionsCRM,
  ...optionsSettings,
  ...optionsInventory,
  ...optionsSales,
  ...optionsPromotions,
];

export const adminHeaderMenuOptions = {
  dashboard: optionsDashboard,
  users: optionsUser,
  cms: optionsCMS,
  crm: optionsCRM,
  inventory: optionsInventory,
  settings: optionsSettings,
  sales: optionsSales,
  promotions: optionsPromotions,
};

export const guestOptions = [
  {
    path: PATH.LOGIN_SCREEN,
    component: LoginPage,
  },
  {
    path: PATH.FORGET_PASSWORD,
    component: ForgetPasswordPage,
  },
  {
    path: PATH.APPROVAL_PAGE,
    component: ApprovalPage,
  },
];

export const adminLayoutOptionsDefault = PATH.ADMIN_USER;
export const guestOptionsDefault = PATH.LOGIN_SCREEN;
