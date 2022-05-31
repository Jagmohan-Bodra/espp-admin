import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  getPromotionDetail,
  getPromotionList,
  reqIsUpdate,
} from '~/reduxs/promotion/action';
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
import BreadcrumbBasic from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue} from '~/components/public/Button';
import DeleteModal from '../promotions-delete';
import {Empty, notification} from 'antd';
import {trans} from '~/components/public/Translate';
import QuickFilterDropdown, {
  TYPE,
} from '~/components/public/quick-filter-dropdown';
import {
  PROMOTIONS_TYPE_OPTION,
  PROMOTION_APPLYFOR_OPTION,
  PROMOTION_STATUS_OPTION,
} from '~/constants/master-data';
import {isAccess} from '~/helpers/utils';
import {
  PROMOTION_CREATE_PERMISSION_KEY,
  PROMOTION_DELETE_PERMISSION_KEY,
  PROMOTION_EDIT_PERMISSION_KEY,
  PROMOTION_PERMISSION_KEY,
  PROMOTION_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const {PAGE_SIZE} = META_DATA.PAGINATION;

const PromotionsList = (props) => {
  const query = getQueryString(props);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.promotion.data);
  const [id, setId] = useState({});
  const obj = useSelector((state) => state.promotion.obj);
  const meta = useSelector((state) => state.promotion.metadata);
  const loading = useSelector((state) => state.promotion.loading);
  const isUpdate = useSelector((state) => state.promotion.isUpdate);
  const ACCESS = {
    LIST: isAccess(PROMOTION_PERMISSION_KEY),
    VIEW: isAccess(PROMOTION_VIEW_PERMISSION_KEY),
    CREATE: isAccess(PROMOTION_CREATE_PERMISSION_KEY),
    EDIT: isAccess(PROMOTION_EDIT_PERMISSION_KEY),
    DELETE: isAccess(PROMOTION_DELETE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      setFilterQueryData({});
    }
  }, [isUpdate]);

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getPromotionList({
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

  const onActionItem = (action) => {
    if (action && action.key == ACTIONS_KEY.EDIT_PROMOTIONS) {
      props.history.push(PATH.PROMOTIONS_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == 'DELETE') {
      setId(action.id);
      dispatch(getPromotionDetail(action.id));
      setVisibleDelete(true);
    }
  };

  const queryBuilder = getQueryBuilder(query) || {};

  const breadcrumbData = () => {
    return [
      {
        name: 'Promotions',
        link: '#',
      },
    ];
  };

  return ACCESS.LIST ? (
    <div>
      <BreadcrumbBasic data={breadcrumbData()} />
      <Toolbox>
        {ACCESS.CREATE && (
          <ButtonBlue
            text="Create"
            onClick={() => props.history.push(PATH.PROMOTIONS_CREATE)}
          />
        )}
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
              key: 'type',
              text: 'Type',
              type: TYPE.SELECT,
              options: PROMOTIONS_TYPE_OPTION,
            },
            {
              key: 'applyFor',
              text: 'Off for',
              type: TYPE.SELECT,
              options: PROMOTION_APPLYFOR_OPTION,
            },
            {
              key: 'status',
              text: 'Status',
              type: TYPE.SELECT,
              options: PROMOTION_STATUS_OPTION,
            },
            {
              key: 'startDate',
              text: 'Start Date',
              type: TYPE.DATE,
            },
            {
              key: 'endDate',
              text: 'End date',
              type: TYPE.DATE,
            },
          ]}
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
        path={PATH.PROMOTIONS_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        id={id}
        obj={obj}
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        query={query}
        onFinish={() => setFilterQueryData()}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default PromotionsList;
