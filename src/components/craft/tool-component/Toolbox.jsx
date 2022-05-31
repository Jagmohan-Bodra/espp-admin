import React, {useEffect, useState} from 'react';
import lz from 'lzutf8';
import {Element, useEditor} from '@craftjs/core';
import {Tooltip} from 'antd';
import {Box, Grid} from '@material-ui/core';

import ImagesBlock from './DataImage';
import {components, decode} from '../common/util';
import {groupBy} from '~/helpers/common';
import './style.scss';
import {debounce} from '../re-component/common';
// import OrderComplete from "../re-component/function-static/OrderComplete";
// import CompareProduct from "../re-component/product-static/CompareProduct";
// import EnquiryForm from "../re-component/function-static/EnquiryForm";
// import InShop from "../re-component/function-static/InShop";
// import PaymentMethod from "../re-component/function-static/PaymentMethod";
// import Process from "../re-component/function-static/Process";
// import SignIn from "../re-component/function-static/SignIn";
// import SignUp from "../re-component/function-static/SignUp";
// import ContactForm from "../re-component/function-static/ContactForm";
// import MapGoogle from "../re-component/MapGoogle";
// import TrackingOrder from "../re-component/function-static/TrackingOrder";
// import ProductDetails from "../re-component/product-static/ProductDetails";
// import ProductList from "../re-component/product-static/ProductList";
// import PageStatic from '../re-component/page-static/PageStatic';
// import {Image} from '../re-component/Image';
import {BasicMenu} from '../re-component/BasicMenu';
// import {Field} from '../re-component/Field';
// import {FieldImage} from '../re-component/FieldImage';
// import {ProductBlock} from '../re-component/ProductBlock';
// import {SwipeProductBlock} from '../re-component/SwipeProductBlock';
import MenuStatic from '../re-component/function-static/MenuStatic';
import JoinMailForm from '../re-component/function-static/JoinMailForm';
import Home from '../re-component/function-static/Home';

const func = debounce((method) => method(), 500);
const getImageLinkBlock = (avatar, title) => {
  if (avatar) {
    return avatar;
  }
  if (ImagesBlock[title]) {
    return ImagesBlock[title];
  }
  return ImagesBlock['no_image'];
};

const ItemBlockLayout = (props) => {
  const {refs, block} = props;
  const {avatar, name, description} = block || {};
  return (
    <div className={`item-block-layout`} ref={refs}>
      <div className={`item-block-layout_image`}>
        <Tooltip title={description}>
          <img
            className="btn-add-block-mockup"
            alt="Add Block"
            src={getImageLinkBlock(avatar, name)}
          />
        </Tooltip>
      </div>
      <span className={`item-block-layout_title`}>{name}</span>
    </div>
  );
};

export const genderComponentById = (
  jsonData,
  styleCustomize = '',
  id = 'ROOT',
) => {
  const {type, isCanvas, props, hidden, nodes} = jsonData[id];

  return (
    <Element
      is={components()[type.resolvedName]}
      canvas={isCanvas}
      {...props}
      hidden={hidden}
      key={id}
      isNew={true}
      styleCustomize={styleCustomize}>
      {(nodes || []).map((nodeItem) =>
        genderComponentById(jsonData, '', nodeItem),
      )}
    </Element>
  );
};

export const Toolbox = ({blockContents}) => {
  const {connectors} = useEditor();
  const [content, setContent] = useState([]);
  useEffect(() => {
    blockContents && func(() => setContent(blockContents));
  }, [blockContents]);
  const groupCode = groupBy(content, 'groupCode').sort((a, b) =>
    a.toUpperCase() < b.toUpperCase() ? -1 : 1,
  );

  return (
    <Box px={2} py={2} className="MuiBox-root-custom">
      <Grid container direction="column" item xs={6}>
        <ItemBlockLayout
          refs={(ref) => connectors.create(ref, <Element is={Home} />)}
          block={{name: 'Home'}}
        />
      </Grid>
      <Grid container direction="column" item xs={6}>
        <ItemBlockLayout
          refs={(ref) => connectors.create(ref, <Element is={JoinMailForm} />)}
          block={{name: 'JoinMailForm'}}
        />
      </Grid>
      <Grid container direction="column" item xs={6}>
        <ItemBlockLayout
          refs={(ref) => connectors.create(ref, <Element is={MenuStatic} />)}
          block={{name: 'MenuStatic'}}
        />
      </Grid>
      <Grid container direction="column" item xs={6}>
        <ItemBlockLayout
          refs={(ref) => connectors.create(ref, <Element is={BasicMenu} />)}
          block={{name: 'BasicMenu'}}
        />
      </Grid>
      <Grid container alignItems="center" justify="center" spacing={1}>
        {groupCode.map((itemGroupCode, indexGroupCode) => [
          <Grid
            container
            direction="column"
            item
            xs={12}
            key={`${indexGroupCode}_`}>
            <div className="o_panel_header">{itemGroupCode}</div>
          </Grid>,
          ...(content || [])
            .sort((a, b) =>
              a.updatedAt.toUpperCase() < b.updatedAt.toUpperCase() ? -1 : 1,
            )
            .map((blockItem, index) => {
              if (blockItem.content && itemGroupCode == blockItem.groupCode) {
                const jsonBlock = JSON.parse(
                  lz.decompress(lz.decodeBase64(blockItem.content)),
                );
                const styleCustomize = decode(
                  (blockItem.styles || {}).styleCustomize || '',
                );
                const component = genderComponentById(
                  jsonBlock,
                  styleCustomize,
                );
                return (
                  <Grid
                    container
                    direction="column"
                    item
                    key={`${indexGroupCode}_${index}`}
                    xs={6}>
                    <ItemBlockLayout
                      refs={(ref) => connectors.create(ref, component)}
                      block={blockItem}
                    />
                  </Grid>
                );
              }
            })
            .filter((item) => item),
        ])}

        {/* <Grid container direction="column" item xs={6}>
          <ItemBlockLayout
            refs={(ref) => connectors.create(ref, <Element is={Image} />)}
            block={{name: 'Image'}}
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout
            refs={(ref) => connectors.create(ref, <Element is={Field} />)}
            block={{name: 'Field'}}
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout
            refs={(ref) => connectors.create(ref, <Element is={FieldImage} />)}
            block={{name: 'FieldImage'}}
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout
            refs={(ref) =>
              connectors.create(ref, <Element is={ProductBlock} />)
            }
            block={{name: 'Product Block'}}
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout
            refs={(ref) =>
              connectors.create(ref, <Element is={SwipeProductBlock} />)
            }
            block={{name: 'Swipe Product Block'}}
          />
        </Grid> */}
        {/* <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={OrderComplete} />)} 
            block={{ name: "Order Complete" }} 
          />
        </Grid> */}
        {/* <Grid container direction="column" item xs={12}>
          <div className="o_panel_header">
            {`Page Static`}
          </div>
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={PageStatic} />)} 
            block={{ name: "Page Static" }} 
          />
        </Grid>

        <Grid container direction="column" item xs={12}>
          <div className="o_panel_header">
            {`Func`}
          </div>
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={CompareProduct} />)} 
            block={{ name: "Compare Product" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={ProductDetails} />)} 
            block={{ name: "Product Details" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={ProductList} />)} 
            block={{ name: "Product List" }} 
          />
        </Grid>

        <Grid container direction="column" item xs={12}>
          <div className="o_panel_header">
            {`Func`}
          </div>
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={EnquiryForm} />)} 
            block={{ name: "Enquiry Form" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={InShop} />)} 
            block={{ name: "InShop" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={PaymentMethod} />)} 
            block={{ name: "Payment Method" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={Process} />)} 
            block={{ name: "Process" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={SignIn} />)} 
            block={{ name: "SignIn" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={SignUp} />)} 
            block={{ name: "SignUp" }} 
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout 
            refs={ref => connectors.create(ref, <Element is={TrackingOrder} />)} 
            block={{ name: "Tracking Order" }} 
          />
        </Grid> */}
        {/* <Grid container direction="column" item xs={6}>
          <ItemBlockLayout
            refs={ref => connectors.create(ref, <Element is={ContactForm} />)}
            block={{ name: "Contact Form" }}
          />
        </Grid>
        <Grid container direction="column" item xs={6}>
          <ItemBlockLayout
            refs={ref => connectors.create(ref, <Element is={MapGoogle} />)}
            block={{ name: "Map" }}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
};
