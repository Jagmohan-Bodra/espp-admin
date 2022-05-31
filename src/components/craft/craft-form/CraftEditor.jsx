import React from 'react';
import {Editor} from '@craftjs/core';
import {Button} from '~/components/craft/re-component/Button';
import {Card, CardTop, CardBottom} from '~/components/craft/re-component/Card';
import {Text} from '~/components/craft/re-component/Text';
import {Container} from '~/components/craft/re-component/Container';
import {PageContainer} from '~/components/craft/re-component/PageContainer';
import {Row} from '~/components/craft/re-component/Row';
import {Col} from '~/components/craft/re-component/Col';
import {Space} from '../re-component/Space';
import {Rate} from '~/components/craft/re-component/Rate';
import {Carousel} from '~/components/craft/re-component/Carousel';
import {Divider} from '~/components/craft/re-component/Divider';
import {Swipers} from '~/components/craft/re-component/Swiper';
import {Block} from '~/components/craft/re-component/Block';
import {MiddleBlock} from '~/components/craft/re-component/MiddleBlock';
import {Avatar} from '~/components/craft/re-component/Avatar';
import {RenderNode} from '../tool-component/RenderNode';
// import {SwiperSlide} from '~/components/craft/re-component/SwiperSlide';
import {Collapse} from '~/components/craft/re-component/Collapse';
import {ItemMenu} from '~/components/craft/re-component/ItemMenu';
import {SubMenu} from '~/components/craft/re-component/SubMenu';
import {Tabs} from '~/components/craft/re-component/Tabs';
import {ButtonFixed} from '~/components/craft/re-component/ButtonFixed';
import {Image} from '~/components/craft/re-component/Image';
import {Field} from '~/components/craft/re-component/Field';
import {FieldImage} from '~/components/craft/re-component/FieldImage';
import {ProductBlock} from '~/components/craft/re-component/ProductBlock';
import {SwipeProductBlock} from '~/components/craft/re-component/SwipeProductBlock';
import {BasicMenu} from '~/components/craft/re-component/BasicMenu';

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

const CraftEditor = (props) => {
  return (
    <Editor
      resolver={{
        Card,
        Button,
        Text,
        Container,
        PageContainer,
        CardTop,
        CardBottom,
        Row,
        Col,
        Space,
        Rate,
        Carousel,
        Divider,
        Swipers,
        Block,
        MiddleBlock,
        Avatar,
        ProductBlock,
        // SwiperSlide,
        Collapse,
        SubMenu,
        ItemMenu,
        Tabs,
        ButtonFixed,
        CompareProduct,
        EnquiryForm,
        InShop,
        PaymentMethod,
        Process,
        SignIn,
        SignUp,
        TrackingOrder,
        ContactForm,
        MapGoogle,
        ProductDetails,
        ProductList,
        PageStatic,
        OrderComplete,
        Image,
        Field,
        FieldImage,
        SwipeProductBlock,
        BasicMenu,
        MenuStatic,
        Home,
        JoinMailForm,
      }}
      enabled={true}
      onRender={RenderNode}>
      {props.children}
    </Editor>
  );
};

export default CraftEditor;
