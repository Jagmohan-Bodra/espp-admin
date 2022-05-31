import {Text as TextComponent} from './Text';
import {Row} from './Row';
import {Col} from './Col';
import {Space} from './Space';
import {PageContainer} from './PageContainer';
import {Container} from './Container';
import {Button} from './Button';
import {Block} from './Block';
import {Swipers} from './Swiper';
import {Divider} from './Divider';
import {Avatar} from './Avatar';
import {Collapse} from './Collapse';
import {ItemMenu} from './ItemMenu';
import {Tabs} from './Tabs';
import {Image} from './Image';
import {Field} from './Field';
import {FieldImage} from './FieldImage';
import {ProductBlock} from './ProductBlock';
import {SwipeProductBlock} from './SwipeProductBlock';
import {BasicMenu} from './BasicMenu';
import CompareProduct from './product-static/CompareProduct';
import EnquiryForm from './function-static/EnquiryForm';
import InShop from './function-static/InShop';
import PaymentMethod from './function-static/PaymentMethod';
import Process from './function-static/Process';
import SignIn from './function-static/SignIn';
import SignUp from './function-static/SignUp';
import ContactForm from './function-static/ContactForm';
import MapGoogle from './MapGoogle';
import TrackingOrder from './function-static/TrackingOrder';
import OrderComplete from './function-static/OrderComplete';
import ProductDetails from './product-static/ProductDetails';
import ProductList from './product-static/ProductList';
import PageStatic from './page-static/PageStatic';
import JoinMailForm from './function-static/JoinMailForm';
import MenuStatic from './function-static/MenuStatic';
import Home from './function-static/Home';

export const getId = (id) => `wiooh-${id}`;

//components copy
export const componentsBuild = () => ({
  PageContainer,
  Container,
  Text: TextComponent,
  Row,
  Col,
  Space,
  Button,
  Block,
  Swipers,
  Divider,
  Avatar,
  Collapse,
  ItemMenu,
  Tabs,
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
  Image,
  Field,
  FieldImage,
  ProductBlock,
  SwipeProductBlock,
  BasicMenu,
  MenuStatic,
  JoinMailForm,
  Home,
});
