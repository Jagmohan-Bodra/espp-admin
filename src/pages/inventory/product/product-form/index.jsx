import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import qs from 'qs';

import {Toolbox} from '~/components/public/Toolbox';
import {ButtonGray, ButtonBlue} from '~/components/public/Button';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard} from '~/components/public/FormHelpers';
import Breadcrumb from '~/components/public/Breadcrumb';
import TabProductDetail from './TabProductDetail';
import TabProductCMS from './TabProductCMS';
import TabProducPrice from './TabProducPrice';
import TabProductSEO from './TabProductSEO';
import {getBrandList} from '~/reduxs/brand/action';
import {getColorList} from '~/reduxs/color/action';
import {getTagList} from '~/reduxs/tag/action';
import {getCategoryList} from '~/reduxs/category/action';

import {stringify, changeUrlQuery} from '~/helpers/queryString';
import PATH from '~/routers/path';
import {TABS} from './data';
import '../style.scss';
import {isAccess} from '~/helpers/utils';
import {INVENTORY_PRODUCT_DELETE_PERMISSION_KEY} from '~/constants/permissions';
const cssClass = 'crm-product-form';

const ProductForm = (props) => {
  const {productPrice, handleSubmitPrice} = props;
  const dispatch = useDispatch();
  const [tab, setTab] = useState('DETAIL');
  const [data, setData] = useState(props.data || {});
  const categories = useSelector((state) => state.category.data);
  const brands = useSelector((state) => state.brand.data);
  const colors = useSelector((state) => state.color.data);
  const tags = useSelector((state) => state.tag.data);
  const meta = {meta: {pageSize: 1000}};
  const searchUrl = qs.parse(props.location.search, {ignoreQueryPrefix: true});
  const {id} = props.match.params;
  const ACCESS = {
    DELETE: isAccess(INVENTORY_PRODUCT_DELETE_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getCategoryList(meta));
    dispatch(getBrandList(meta));
    dispatch(getColorList(meta));
    dispatch(getTagList(meta));
    const {activeTab} = searchUrl;
    if (activeTab) {
      setTab(activeTab);
    }
  }, []);

  useEffect(() => {
    setData({...props.data});
  }, [props.data]);

  const onTabClick = (key) => {
    setTab(key);
    let queryParam = stringify({activeTab: key});
    changeUrlQuery(props, queryParam);
  };

  const onSave = (dataForm) => {
    props.onSave && props.onSave(dataForm);
  };

  const onDelete = () => {
    props.onDelete && props.onDelete(data);
  };

  const renderTabContent = (tab, data) => {
    switch (tab) {
      case 'DETAIL':
        return (
          <TabProductDetail
            data={{
              ...data,
              colors: (data.colors || []).map((item) => item._id),
              brands: (data.brands || []).map((item) => item._id),
              tags: (data.tags || []).map((item) => item._id),
              productCategories: (data.productCategories || []).map(
                (item) => item._id,
              ),
            }}
            categories={categories}
            brands={brands}
            colors={colors}
            tags={tags}
            onSave={onSave}
            isUpdate={props.isUpdate}
          />
        );
      case 'PRICE_MANAGEMENT':
        return (
          <TabProducPrice
            publicPrice={data.publicPrice}
            onSave={onSave}
            isUpdate={props.isUpdate}
            productPrice={productPrice}
            handleSubmitPrice={handleSubmitPrice}
          />
        );
      case 'PRODUCT_CMS':
        return (
          <TabProductCMS
            data={data}
            onSave={onSave}
            isUpdate={props.isUpdate}
          />
        );
      case 'SEO':
        return (
          <TabProductSEO
            data={data}
            onSave={onSave}
            isUpdate={props.isUpdate}
          />
        );
    }
  };

  return (
    <div className="product-form">
      <Breadcrumb data={getBreadcrumb(id, data)} />
      <Toolbox>
        {id && ACCESS.DELETE && <ButtonBlue text="Delete" onClick={onDelete} />}
      </Toolbox>
      <FromCard>
        <RowAuto>
          <ColAuto desktop={5} className={`${cssClass}__col-left`}>
            {TABS &&
              TABS.map((item) => (
                <ButtonGray
                  key={item.key}
                  onClick={() => onTabClick(item.key)}
                  className={`${cssClass}__button ${
                    item.key == tab ? 'active' : ''
                  }`}
                  text={item.value}
                  disabled={!id ? true : false}
                />
              ))}
          </ColAuto>
          <ColAuto desktop={19} className={`${cssClass}__col-right`}>
            {renderTabContent(tab, data)}
          </ColAuto>
        </RowAuto>
      </FromCard>
    </div>
  );
};

export default withRouter(ProductForm);

const getBreadcrumb = (id, data) => {
  let {name} = data || {};
  let nameBread = id ? name : 'Create';
  return [
    {name: 'Products', link: PATH.INVENTORY_PRODUCT},
    {name: nameBread, link: '#'},
  ];
};
