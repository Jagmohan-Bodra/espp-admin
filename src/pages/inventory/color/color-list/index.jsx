import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getColorList} from '~/reduxs/color/action';
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
import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import DeleteModal from '../color-delete';
import PATH from '~/routers/path';
import '../style.scss';
import {isAccess} from '~/helpers/utils';
import {
  INVENTORY_COLOR_CREATE_PERMISSION_KEY,
  INVENTORY_COLOR_DELETE_PERMISSION_KEY,
  INVENTORY_COLOR_EDIT_PERMISSION_KEY,
  INVENTORY_COLOR_PERMISSION_KEY,
  INVENTORY_COLOR_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty} from 'antd';
const cssClass = 'color-list-page';

const ColorList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const colors = useSelector((state) => state.color.data);
  const metadata = useSelector((state) => state.color.metadata);
  const loading = useSelector((state) => state.color.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(INVENTORY_COLOR_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_COLOR_VIEW_PERMISSION_KEY),
    CREATE: isAccess(INVENTORY_COLOR_CREATE_PERMISSION_KEY),
    EDIT: isAccess(INVENTORY_COLOR_EDIT_PERMISSION_KEY),
    DELETE: isAccess(INVENTORY_COLOR_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {...queryBuilder.meta, ...{sort: ['-_id']}};
    delete queryBuilder.reset;
    dispatch(
      getColorList({
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
    props.history.push(PATH.INVENTORY_COLOR_CREATE);
  };

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT') {
      props.history.push(PATH.INVENTORY_COLOR_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == 'DELETE') {
      setObj(colors.find((item) => item._id == action.id) || {});
      setVisible(true);
    }
  };

  const deleteSuccess = () => {
    setFilterQueryData();
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass} admin-color-list`}>
      <Breadcrumb data={[{name: 'Colors', link: '#'}]} />
      <Toolbox>
        <ButtonBlue text="Create" onClick={onCreate} />
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
        data={colors}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.INVENTORY_COLOR_UPDATE}
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

export default withRouter(ColorList);
