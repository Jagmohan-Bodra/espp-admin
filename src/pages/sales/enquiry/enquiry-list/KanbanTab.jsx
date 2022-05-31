import React from 'react';
import {Spin} from 'antd';
import {withRouter} from 'react-router-dom';
import Kanban, {Card, KanbanGroup} from '~/components/public/kanban';
import PATH from '~/routers/path';
import {useSelector} from 'react-redux';
import {formatDateTime} from '~/helpers/date';

const cssClass = 'pages-sales-orders';

const dataCardByStatus = (dataSource, status, isPermission) => {
  const data = (dataSource || []).filter((item) => item.status === status);
  const dataMapping = (data || []).map((item) => ({
    headers: {
      code: (item.product || {}).name,
      datetimehead: formatDateTime(item.createdAt),
      path: isPermission
        ? PATH.SALES_ENQUIRY_UPDATE.replace(':id', item._id)
        : '#',
    },
    bodies: {
      name: item.name,
      email: item.email,
      phone: item.contact,
    },
  }));
  return dataMapping.map((item, index) => <Card key={index} {...item} />);
};

const KanbanTab = ({isEdit, isView}) => {
  const dataSource = useSelector((state) => state.enquiry.data);
  const loading = useSelector((state) => state.enquiry.loading);
  return (
    <div className={`${cssClass}__kanban_tab`}>
      <Spin spinning={loading}>
        <KanbanGroup
          kanbans={[
            <Kanban
              key={0}
              header={
                'OPEN ' +
                (dataSource || []).filter((item) => item.status === 'OPEN')
                  .length
              }
              carts={dataCardByStatus(dataSource, 'OPEN', isEdit || isView)}
            />,
            <Kanban
              key={1}
              header={
                'QUOTATION SENT ' +
                (dataSource || []).filter(
                  (item) => item.status === 'QUOTATION_SENT',
                ).length
              }
              carts={dataCardByStatus(
                dataSource,
                'QUOTATION_SENT',
                isEdit || isView,
              )}
            />,
            <Kanban
              key={2}
              header={
                'WON ' +
                (dataSource || []).filter((item) => item.status === 'WON')
                  .length
              }
              carts={dataCardByStatus(dataSource, 'WON', isEdit || isView)}
            />,
            <Kanban
              key={3}
              header={
                'LOST ' +
                (dataSource || []).filter((item) => item.status === 'LOST')
                  .length
              }
              carts={dataCardByStatus(dataSource, 'LOST', isEdit || isView)}
            />,
            <Kanban
              key={4}
              header={
                'CLOSED ' +
                (dataSource || []).filter((item) => item.status === 'CLOSED')
                  .length
              }
              carts={dataCardByStatus(dataSource, 'CLOSED', isEdit || isView)}
            />,
          ]}
        />
      </Spin>
    </div>
  );
};

export default withRouter(KanbanTab);
