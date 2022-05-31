import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableData from '~/components/public/TableData';
import columns, {ACTIONS_KEY} from './columns';
import PATH from '~/routers/path';
import {META_DATA} from '~/config/index';
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
import BreadcrumbBasic from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue} from '~/components/public/Button';
import DeleteModal from '../block-delete';
import {getBlockDetail, getBlockList} from '~/reduxs/block/action';
import {isAccess} from '~/helpers/utils';
import {
  CMS_BLOCK_CREATE_PERMISSION_KEY,
  CMS_BLOCK_DELETE_PERMISSION_KEY,
  CMS_BLOCK_EDIT_PERMISSION_KEY,
  CMS_BLOCK_PERMISSION_KEY,
  CMS_BLOCK_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty} from 'antd';

const {PAGE_SIZE} = META_DATA.PAGINATION;
const cssClass = 'page_cms_page';

const BlockList = (props) => {
  const query = getQueryString(props);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.block.data);
  const [id, setId] = useState({});
  const obj = useSelector((state) => state.block.obj);
  const meta = useSelector((state) => state.block.metadata);
  const loading = useSelector((state) => state.block.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(CMS_BLOCK_PERMISSION_KEY),
    VIEW: isAccess(CMS_BLOCK_VIEW_PERMISSION_KEY),
    CREATE: isAccess(CMS_BLOCK_CREATE_PERMISSION_KEY),
    EDIT: isAccess(CMS_BLOCK_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_BLOCK_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getBlockList({
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
      meta: {page: '1'},
    });
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const breadcrumbData = () => {
    return [
      {
        name: 'Block',
        link: '#',
      },
    ];
  };

  const onActionItem = (action) => {
    if (action && action.key == ACTIONS_KEY.EDIT_POST) {
      props.history.push(PATH.CMS_BLOCKS_UPDATE_UI.replace(':id', action.id));
    }
    if (action && action.key === ACTIONS_KEY.SETTING) {
      props.history.push(PATH.CMS_BLOCKS_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == ACTIONS_KEY.DELETE) {
      setId(action.id);
      dispatch(getBlockDetail(action.id));
      setVisibleDelete(true);
    }
  };

  return ACCESS.LIST ? (
    <div>
      <BreadcrumbBasic data={breadcrumbData()} />
      <Toolbox>
        {ACCESS.CREATE && (
          <ButtonBlue
            text="Create"
            onClick={() => props.history.push(PATH.CMS_BLOCKS_CREATE)}
          />
        )}
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
        data={data || []}
        onActionItem={onActionItem}
        columns={columns}
        metadata={meta}
        loading={loading}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.CMS_BLOCKS_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        id={id}
        obj={obj}
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        onFinish={() => setFilterQueryData()}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default BlockList;
