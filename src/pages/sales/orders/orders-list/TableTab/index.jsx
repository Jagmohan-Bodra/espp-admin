import React from 'react';
import {withRouter} from 'react-router-dom';

import columns from './columns';
import TableData from '~/components/public/TableData';
import PATH from '~/routers/path';
import '../../../style.scss';
const cssClass = 'orders-list-page';

const OrdersList = (props) => {
  const {
    data,
    meta,
    loading,
    onPageChange,
    onSortChange,
    sortFilter,
    isView,
    isEdit,
  } = props;

  const onActionItem = (action) => {
    if (action && action.key == 'VIEW_ORDERS') {
      props.history.push(PATH.SALES_ORDERS_UPDATE.replace(':id', action.id));
    }
  };

  return (
    <div className={`${cssClass} admin-orders-list`}>
      <TableData
        data={data}
        onActionItem={onActionItem}
        columns={columns}
        metadata={meta}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={sortFilter}
        path={PATH.SALES_ORDERS_UPDATE}
        isView={isView}
        isEdit={isEdit}
      />
    </div>
  );
};

export default withRouter(OrdersList);
