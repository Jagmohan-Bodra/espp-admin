import {Text as TextComponent} from '~/components/craft/re-component/Text';
import {Row} from '~/components/craft/re-component/Row';
import {Col} from '~/components/craft/re-component/Col';
import {Space} from '~/components/craft/re-component/Space';
import {PageContainer} from '~/components/craft/re-component/PageContainer';
import {Container} from '~/components/craft/re-component/Container';
import {Button} from '~/components/craft/re-component/Button';
import {Block} from '~/components/craft/re-component/Block';
import {Swipers} from '~/components/craft/re-component/Swiper';
import {MiddleBlock} from '~/components/craft/re-component/MiddleBlock';
import {Divider} from '~/components/craft/re-component/Divider';
import {Avatar} from '~/components/craft/re-component/Avatar';
// import {SwiperSlide} from '~/components/craft/re-component/SwiperSlide';
import {Collapse} from '~/components/craft/re-component/Collapse';
import {ItemMenu} from '~/components/craft/re-component/ItemMenu';
import {SubMenu} from '~/components/craft/re-component/SubMenu';
import {Tabs} from '~/components/craft/re-component/Tabs';
import {Image} from '~/components/craft/re-component/Image';
import {Field} from '~/components/craft/re-component/Field';
import {FieldImage} from '~/components/craft/re-component/FieldImage';
import {ProductBlock} from '~/components/craft/re-component/ProductBlock';
import {BasicMenu} from '~/components/craft/re-component/BasicMenu';
import {SwipeProductBlock} from '~/components/craft/re-component/SwipeProductBlock';
import CompareProduct from '~/components/craft/re-component/product-static/CompareProduct';
import EnquiryForm from '~/components/craft/re-component/function-static/EnquiryForm';
import InShop from '~/components/craft/re-component/function-static/InShop';
import PaymentMethod from '~/components/craft/re-component/function-static/PaymentMethod';
import Process from '~/components/craft/re-component/function-static/Process';
import SignIn from '~/components/craft/re-component/function-static/SignIn';
import SignUp from '~/components/craft/re-component/function-static/SignUp';
import ContactForm from '~/components/craft/re-component/function-static/ContactForm';
import MapGoogle from '~/components/craft/re-component/MapGoogle';
import TrackingOrder from '~/components/craft/re-component/function-static/TrackingOrder';
import ProductDetails from '~/components/craft/re-component/product-static/ProductDetails';
import ProductList from '~/components/craft/re-component/product-static/ProductList';
import PageStatic from '~/components/craft/re-component/page-static/PageStatic';
import OrderComplete from '~/components/craft/re-component/function-static/OrderComplete';
import MenuStatic from '~/components/craft/re-component/function-static/MenuStatic';
import JoinMailForm from '~/components/craft/re-component/function-static/JoinMailForm';
import Home from '~/components/craft/re-component/function-static/Home';
import lz from 'lzutf8';

export const encode = (json) => {
  return json ? lz.encodeBase64(lz.compress(json)) : '';
};

export const decode = (json) => {
  return json ? lz.decompress(lz.decodeBase64(json)) : '';
};

export const isEmptyObj = (obj) => {
  return (
    obj === null ||
    obj === undefined ||
    obj == '' ||
    !obj ||
    typeof obj !== 'object' ||
    Object.values(obj).length == 0
  );
};

export const clean = (objData) => {
  if (!objData || typeof objData !== 'object') {
    return objData;
  }
  let obj = {...objData};
  Object.keys(obj).map((propName) => {
    obj[propName] = clean(obj[propName]);
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] == '' ||
      Object.values(obj[propName]).length == 0
    ) {
      if (Number.isInteger(obj[propName])) {
        return;
      }
      delete obj[propName];
    }
  });
  return obj;
};

export const replaceAll = (str = '', reg, rep) => {
  return str.replace(new RegExp(reg, 'g'), rep);
};

export const convertToCssString = (obj) => {
  let newObj = {...obj};
  if (newObj['background-image']) {
    newObj['background-image'] = `url('${obj['background-image']}')`;
  } else {
    delete newObj['background-image'];
  }
  if (newObj['background-position']) {
    newObj[
      'background-position'
    ] = `${obj['background-position'].x}% ${obj['background-position'].y}%`;
  } else {
    delete newObj['background-position'];
  }

  let newStr = JSON.stringify(newObj);
  newStr = replaceAll(newStr, '"', '');
  newStr = replaceAll(newStr, ',', ';');
  newStr = replaceAll(newStr, '//<', ',');
  return newStr;
};

//components copy
export const components = () => ({
  PageContainer: PageContainer,
  Container: Container,
  Text: TextComponent,
  Row: Row,
  Col: Col,
  Space: Space,
  Button,
  Block: Block,
  Swipers: Swipers,
  MiddleBlock: MiddleBlock,
  Divider: Divider,
  Avatar: Avatar,
  // SwiperSlide: SwiperSlide,
  Collapse: Collapse,
  ItemMenu: ItemMenu,
  SubMenu: SubMenu,
  ProductBlock,
  Tabs: Tabs,
  BasicMenu,
  Image,
  Field,
  FieldImage,
  SwipeProductBlock,
  CompareProduct,
  EnquiryForm,
  InShop,
  PaymentMethod,
  Process,
  SignIn,
  SignUp,
  ContactForm,
  MapGoogle,
  TrackingOrder,
  ProductDetails,
  ProductList,
  PageStatic,
  OrderComplete,
  MenuStatic,
  JoinMailForm,
  Home,
});
