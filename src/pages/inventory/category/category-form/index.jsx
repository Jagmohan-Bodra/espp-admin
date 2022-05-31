import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import qs from 'qs';

import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard} from '~/components/public/FormHelpers';
import Breadcrumb from '~/components/public/Breadcrumb';
import TabCategoryDetail from './TabCategoryDetail';
import TabCategorySEO from './TabCategorySEO';
import {stringify, changeUrlQuery} from '~/helpers/queryString';
import PATH from '~/routers/path';
import '../style.scss';
import {INVENTORY_PRODUCT_CATEGORY_DELETE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
const cssClass = 'inventory-brand-form';

const CategoryForm = (props) => {
  const [tab, setTab] = useState('CATEGORY_DETAIL');
  const [data, setData] = useState(props.data || {});
  const searchUrl = qs.parse(props.location.search, {ignoreQueryPrefix: true});
  const {id} = props.match.params;
  const ACCESS = {
    DELETE: isAccess(INVENTORY_PRODUCT_CATEGORY_DELETE_PERMISSION_KEY),
  };
  useEffect(() => {
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
      case 'CATEGORY_DETAIL':
        return (
          <TabCategoryDetail
            data={data}
            onSave={onSave}
            isUpdate={props.isUpdate}
          />
        );
      case 'CATEGORY_SEO':
        return (
          <TabCategorySEO
            data={data}
            onSave={onSave}
            isUpdate={props.isUpdate}
          />
        );
    }
  };

  return (
    <div className={cssClass}>
      <Breadcrumb data={getBreadcrumb(id, data)} />
      <Toolbox>
        {id && ACCESS.DELETE && <ButtonBlue text="Delete" onClick={onDelete} />}
      </Toolbox>
      <FromCard>
        <RowAuto>
          <ColAuto desktop={4} className={`${cssClass}__col-left`}>
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
          <ColAuto desktop={20} className={`${cssClass}__col-right`}>
            <Spin spinning={props.loading}>{renderTabContent(tab, data)}</Spin>
          </ColAuto>
        </RowAuto>
      </FromCard>
    </div>
  );
};

export default withRouter(CategoryForm);

const getBreadcrumb = (id, data) => {
  let {name} = data || {};
  let nameCategory = id ? name : 'Create';
  return [
    {name: 'Categories', link: PATH.INVENTORY_CATEGORY},
    {name: nameCategory, link: '#'},
  ];
};

const TABS = [
  {
    key: 'CATEGORY_DETAIL',
    value: 'Category Detail',
  },
  {
    key: 'CATEGORY_SEO',
    value: 'SEO',
  },
];
