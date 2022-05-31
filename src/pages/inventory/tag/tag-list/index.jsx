import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getTagList} from '~/reduxs/tag/action';
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
import DeleteModal from '../tag-delete';
import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import PATH from '~/routers/path';
import '../style.scss';
import {isAccess} from '~/helpers/utils';
import {
  INVENTORY_TAG_CREATE_PERMISSION_KEY,
  INVENTORY_TAG_DELETE_PERMISSION_KEY,
  INVENTORY_TAG_EDIT_PERMISSION_KEY,
  INVENTORY_TAG_PERMISSION_KEY,
  INVENTORY_TAG_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty} from 'antd';
const cssClass = 'tag-list-page';

const TagList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const tags = useSelector((state) => state.tag.data);
  const metadata = useSelector((state) => state.tag.metadata);
  const loading = useSelector((state) => state.tag.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(INVENTORY_TAG_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_TAG_VIEW_PERMISSION_KEY),
    CREATE: isAccess(INVENTORY_TAG_CREATE_PERMISSION_KEY),
    EDIT: isAccess(INVENTORY_TAG_EDIT_PERMISSION_KEY),
    DELETE: isAccess(INVENTORY_TAG_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {...queryBuilder.meta, ...{sort: ['-_id']}};
    delete queryBuilder.reset;
    dispatch(
      getTagList({
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
    props.history.push(PATH.INVENTORY_TAG_CREATE);
  };

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT') {
      props.history.push(PATH.INVENTORY_TAG_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == 'DELETE') {
      setObj(tags.find((item) => item._id == action.id) || {});
      setVisible(true);
    }
  };

  const deleteSuccess = () => {
    setFilterQueryData();
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass} admin-tag-list`}>
      <Breadcrumb data={[{name: 'Tags', link: '#'}]} />
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
        data={tags}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.INVENTORY_TAG_UPDATE}
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

export default withRouter(TagList);
