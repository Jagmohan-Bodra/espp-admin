import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getBrandList} from '~/reduxs/brand/action';
import columns from './columns';
import TableData from '~/components/public/TableData';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonBlue} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import DeleteModal from '../brand-delete';
import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import PATH from '~/routers/path';
import '../style.scss';
import {
  INVENTORY_BRAND_CREATE_PERMISSION_KEY,
  INVENTORY_BRAND_DELETE_PERMISSION_KEY,
  INVENTORY_BRAND_EDIT_PERMISSION_KEY,
  INVENTORY_BRAND_PERMISSION_KEY,
  INVENTORY_BRAND_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty} from 'antd';
const cssClass = 'brand-list-page';

const BrandList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const brands = useSelector((state) => state.brand.data);
  const metadata = useSelector((state) => state.brand.metadata);
  const loading = useSelector((state) => state.brand.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(INVENTORY_BRAND_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_BRAND_VIEW_PERMISSION_KEY),
    CREATE: isAccess(INVENTORY_BRAND_CREATE_PERMISSION_KEY),
    EDIT: isAccess(INVENTORY_BRAND_EDIT_PERMISSION_KEY),
    DELETE: isAccess(INVENTORY_BRAND_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {...queryBuilder.meta, ...{sort: ['-_id']}};
    delete queryBuilder.reset;
    dispatch(
      getBrandList({
        ...queryBuilder,
      }),
    );
  }, [query]);

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

  const onPageChange = (page) => {
    setFilterQueryData({
      ...getPageFilter(page),
    });
  };

  const handleSearchSubmit = (params) => {
    setFilterQueryData({
      ...params,
      meta: {page: 1},
    });
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const onCreate = () => {
    props.history.push(PATH.INVENTORY_BRAND_CREATE);
  };

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT') {
      props.history.push(PATH.INVENTORY_BRAND_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == 'DELETE') {
      setObj(brands.find((item) => item._id == action.id) || {});
      setVisible(true);
    }
  };

  const deleteSuccess = () => {
    setFilterQueryData();
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass} admin-brand-list`}>
      <Breadcrumb data={[{name: 'Brands', link: '#'}]} />
      <Toolbox>
        {ACCESS.CREATE && <ButtonBlue text="Create" onClick={onCreate} />}
        <FilterDropdown
          overlay={
            <FilterLayout
              handleSearchSubmit={handleSearchSubmit}
              dataFilter={queryBuilder}
            />
          }
          className={`${cssClass}__btn_filter`}
        />
      </Toolbox>

      <TableData
        onActionItem={onActionItem}
        data={brands}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.INVENTORY_BRAND_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(BrandList);
