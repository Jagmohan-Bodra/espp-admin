import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import layout from './layout/reducer';
import routing from './routing/reducer';
import error from './error/reducer';
import auth from './auth/reducer';
import me from './me/reducer';
import user from './user/reducer';
import role from './role/reducer';
import customer from './customer/reducer';
import address from './address/reducer';
import membership from './membership/reducer';
import product from './product/reducer';
import brand from './brand/reducer';
import category from './category/reducer';
import tag from './tag/reducer';
import color from './color/reducer';
import page from './page/reducer';
import post from './post/reducer';
import postCategory from './post-category/reducer';
import block from './block/reducer';
import upload from './upload/reducer';
import modal from './modal/reducer';
import notification from './notification/reducer';
import pushNotification from './push-notification/reducer';
import seoSetting from './seo-setting/reducer';
import craft from './craft/reducer';
import settings from './settings/reducer';
import orders from './orders/reducer';
import enquiry from './enquiry/reducer';
import promotion from './promotion/reducer';
import theme from './theme/reducer';
import variant from './variant/reducer';
import subscription from './subscription/reducer';

const store = createStore(
  combineReducers({
    layout: layout,
    auth: auth,
    me: me,
    error: error,
    routing: routing,
    user: user,
    role: role,
    customer: customer,
    address: address,
    membership: membership,
    product: product,
    brand: brand,
    category: category,
    tag: tag,
    color: color,
    page: page,
    post: post,
    postCategory: postCategory,
    block: block,
    upload: upload,
    notification: notification,
    pushNotification: pushNotification,
    modal: modal,
    seoSetting: seoSetting,
    settings: settings,
    craft: craft,
    orders: orders,
    enquiry: enquiry,
    promotion: promotion,
    theme: theme,
    variant: variant,
    subscription: subscription,
  }),
  {},
  compose(applyMiddleware(thunk)),
);

export default store;
