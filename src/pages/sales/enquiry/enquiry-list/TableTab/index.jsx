import React from 'react';
import {withRouter} from 'react-router-dom';

import columns from './columns';
import TableData from '~/components/public/TableData';
import PATH from '~/routers/path';
import '../../../style.scss';
const cssClass = 'user-list-page';

const EnquiryList = (props) => {
  const {
    data,
    meta,
    loading,
    onPageChange,
    onSortChange,
    isView,
    isEdit,
  } = props;

  const onActionItem = (action) => {
    if (action && action.key == 'VIEW_ENQUIRY') {
      props.history.push(PATH.SALES_ENQUIRY_UPDATE.replace(':id', action.id));
    }
  };

  return (
    <div className={`${cssClass} admin-user-list`}>
      <TableData
        data={data}
        onActionItem={onActionItem}
        columns={columns}
        metadata={meta}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        path={PATH.SALES_ENQUIRY_UPDATE}
        isView={isView}
        isEdit={isEdit}
      />
    </div>
  );
};

export default withRouter(EnquiryList);
