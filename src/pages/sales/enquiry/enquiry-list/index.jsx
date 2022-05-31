import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Breadcrumb from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';

import {getEnquiryList} from '~/reduxs/enquiry/action';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import SwitchButton, {
  ListSwitchBtn,
  TabsSwitchBtn,
} from '~/components/public/screen-switch-button';
import KanbanTab from './KanbanTab';
import TableTab from './TableTab';
import '../../style.scss';
import {META_DATA} from '~/config';
import QuickFilterDropdown, {
  TYPE,
} from '~/components/public/quick-filter-dropdown';
import {ENQUIRY_STATUS_OPTION} from '~/constants/master-data';
import {getProductList} from '~/reduxs/product/action';
import qs from 'qs';
import {
  SALE_ENQUIRY_CREATE_PERMISSION_KEY,
  SALE_ENQUIRY_DELETE_PERMISSION_KEY,
  SALE_ENQUIRY_EDIT_PERMISSION_KEY,
  SALE_ENQUIRY_PERMISSION_KEY,
  SALE_ENQUIRY_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty} from 'antd';

const {PAGE_SIZE} = META_DATA.PAGINATION;
const cssClass = 'orders-list-page';
const TABS = {
  TAB: 'KANBAN_TAB',
  TABLE: 'TABLE_TAB',
};
const SELECT_BUTTON = {
  [TABS.TAB]: 0,
  [TABS.TABLE]: 1,
};
const EnquiryList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const [tab, setTab] = useState(query.key || TABS.TAB);
  const data = useSelector((state) => state.enquiry.data);
  const meta = useSelector((state) => state.enquiry.metadata);
  const loading = useSelector((state) => state.enquiry.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const searchUrl = qs.parse(props.location.search, {ignoreQueryPrefix: true});
  const ACCESS = {
    LIST: isAccess(SALE_ENQUIRY_PERMISSION_KEY),
    VIEW: isAccess(SALE_ENQUIRY_VIEW_PERMISSION_KEY),
    CREATE: isAccess(SALE_ENQUIRY_CREATE_PERMISSION_KEY),
    EDIT: isAccess(SALE_ENQUIRY_EDIT_PERMISSION_KEY),
    DELETE: isAccess(SALE_ENQUIRY_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    const {key} = searchUrl;
    if (key) {
      setTab(key);
    }
    dispatch(getProductList({meta: {pageSize: 1000, page: 1}}));
  }, []);

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getEnquiryList({
        meta: {pageSize: 1000, page: 1},
        ...queryBuilder,
      }),
    );
  }, [query]);

  const onTabClick = (key) => {
    setTab(key);
    setFilterQueryData({
      ...getPageFilter(1, key === TABS.TAB ? true : false),
      key: key,
    });
  };

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = getQueryBuilder(query) || {};
    const data = {
      ...queryBuilder,
      ...value,
      meta: {
        ...(queryBuilder.meta || {}),
        ...(value.meta || {}),
      },
      reset: !(queryBuilder.reset === 'true'),
    };
    const queryParam = stringify(data);
    changeUrlQuery(props, queryParam);
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const onPageChange = (page) => {
    setFilterQueryData({
      ...getPageFilter(page),
    });
  };

  const handleSearchSubmit = (params) => {
    setFilterQueryData({
      ...params,
      meta: {page: '1'},
    });
  };

  const renderTabContent = (tab) => {
    switch (tab) {
      case 'KANBAN_TAB':
        return (
          <KanbanTab
            isEdit={ACCESS.EDIT}
            isDelete={ACCESS.DELETE}
            isView={ACCESS.VIEW}
          />
        );
      case 'TABLE_TAB':
        return (
          <TableTab
            data={data}
            meta={meta}
            loading={loading}
            pageSize={PAGE_SIZE}
            onPageChange={onPageChange}
            onSortChange={onSortChange}
            sortFilter={(queryBuilder.meta || {}).sort || []}
            isEdit={ACCESS.EDIT}
            isDelete={ACCESS.DELETE}
            isView={ACCESS.VIEW}
          />
        );
    }
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass}`}>
      <Breadcrumb data={[{name: 'Enquiry', link: '#'}]} />
      <Toolbox className={cssClass}>
        <div className={`${cssClass}__button-left`}>
          <QuickFilterDropdown
            dataFilter={queryBuilder}
            handleSearchSubmit={handleSearchSubmit}
            options={[
              {
                key: 'name',
                text: 'Name',
                type: TYPE.INPUT,
              },
              {
                key: 'email',
                text: 'Email',
                type: TYPE.INPUT,
              },
              {
                key: 'contact',
                text: 'Contact',
                type: TYPE.INPUT,
              },
              {
                key: 'message',
                text: 'Message',
                type: TYPE.INPUT,
              },
              {
                key: 'product',
                text: 'Product',
                type: TYPE.SELECT,
                options: (products || []).map((item) => ({
                  key: item._id,
                  name: item.name,
                })),
              },
              {
                key: 'status',
                text: 'Status',
                type: TYPE.SELECT,
                options: ENQUIRY_STATUS_OPTION,
              },
              {
                key: 'createdAt',
                text: 'Created at',
                type: TYPE.DATE_RANGE,
              },
            ]}
          />
        </div>
        <SwitchButton
          cssClassProps={cssClass}
          itemSwitchBtns={[
            (btnProps) => (
              <TabsSwitchBtn
                {...btnProps}
                onClick={() => {
                  onTabClick(TABS.TAB);
                }}
              />
            ),
            (btnProps) => (
              <ListSwitchBtn
                {...btnProps}
                onClick={() => {
                  onTabClick(TABS.TABLE);
                }}
              />
            ),
          ]}
          select={SELECT_BUTTON[tab]}
        />
      </Toolbox>
      <div className={`${cssClass}_body`}>{renderTabContent(tab)}</div>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(EnquiryList);
