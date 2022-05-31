import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import columns from './columns';
import TableData from '~/components/public/TableData';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonBlue} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import {getCategoryList} from '~/reduxs/category/action';
import DeleteModal from '../category-delete';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import PATH from '~/routers/path';
import '../style.scss';
import {treeArray} from '~/helpers/common';
import {isAccess} from '~/helpers/utils';
import {
  INVENTORY_PRODUCT_CATEGORY_CREATE_PERMISSION_KEY,
  INVENTORY_PRODUCT_CATEGORY_DELETE_PERMISSION_KEY,
  INVENTORY_PRODUCT_CATEGORY_EDIT_PERMISSION_KEY,
  INVENTORY_PRODUCT_CATEGORY_PERMISSION_KEY,
  INVENTORY_PRODUCT_CATEGORY_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty} from 'antd';

const breadcrumbs = [
  {
    name: 'Categories',
    link: '#',
  },
];

const CategoryList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const [filter, setFilter] = useState(false);
  const categorys = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.category.loading);
  const metadata = useSelector((state) => state.category.metadata);
  const queryBuilder = getQueryBuilder(query) || {};
  let treeArr = treeArray(categorys);
  const ACCESS = {
    LIST: isAccess(INVENTORY_PRODUCT_CATEGORY_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_PRODUCT_CATEGORY_VIEW_PERMISSION_KEY),
    CREATE: isAccess(INVENTORY_PRODUCT_CATEGORY_CREATE_PERMISSION_KEY),
    EDIT: isAccess(INVENTORY_PRODUCT_CATEGORY_EDIT_PERMISSION_KEY),
    DELETE: isAccess(INVENTORY_PRODUCT_CATEGORY_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getCategoryList(filter ? {...queryBuilder} : {meta: {pageSize: 1000}}),
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
    });
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT') {
      props.history.push(
        PATH.INVENTORY_CATEGORY_UPDATE.replace(':id', action.id),
      );
    }
    if (action && action.key == 'DELETE') {
      setObj(categorys.find((item) => item._id == action.id) || {});
      setVisible(true);
    }
  };

  const deleteSuccess = () => {
    setFilterQueryData();
  };

  return ACCESS.LIST ? (
    <div className="category-list-page">
      <Breadcrumb data={breadcrumbs} />
      <Toolbox>
        {ACCESS.CREATE && (
          <ButtonBlue
            text="Create"
            onClick={() => props.history.push(PATH.INVENTORY_CATEGORY_CREATE)}
          />
        )}
        <FilterDropdown
          overlay={
            <FilterLayout
              handleSearchSubmit={handleSearchSubmit}
              dataFilter={queryBuilder}
              setFilter={setFilter}
            />
          }
          className="btn_filter"
        />
      </Toolbox>

      <TableData
        onActionItem={onActionItem}
        data={filter ? categorys : treeArr}
        columns={columns}
        metadata={filter ? metadata : undefined}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.INVENTORY_CATEGORY_UPDATE}
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

export default withRouter(CategoryList);
