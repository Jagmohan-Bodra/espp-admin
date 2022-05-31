import React from 'react';
import {Spin} from 'antd';
import {withRouter} from 'react-router-dom';
import Kanban, {Card, KanbanGroup} from '~/components/public/kanban';
import PATH from '~/routers/path';
import {formatDateTime} from '~/helpers/date';
import {useSelector} from 'react-redux';
import {ORDERS_STATUS} from '~/constants/master-data';
import orders from '~/apis/api/orders';

const cssClass = 'pages-sales-orders';

const dataCardByStatus = (dataSource, status, isPermission) => {
  const data = (dataSource || []).filter((item) => item.status === status);
  const dataMapping = (data || []).map((item) => ({
    headers: {
      code: item.orderNo,
      path: isPermission
        ? PATH.SALES_ORDERS_UPDATE.replace(':id', item._id)
        : '#',
    },
    bodies: {
      name:
        ((item.customer || {}).user || {}).firstName +
        ' ' +
        ((item.customer || {}).user || {}).lastName,
      datetime: formatDateTime(item.orderDateTime),
      quantity: item.quantity,
      amount: item.grandTotal,
      currency: 'SGD',
    },
  }));
  return dataMapping.map((item, index) => <Card key={index} {...item} />);
};

const KanbanTab = ({isEdit, isView, setFilterQueryData}) => {
  const dataSource = useSelector((state) => state.orders.data);
  const loading = useSelector((state) => state.orders.loading);
  const data = dataSource || [];

  const onSettingChange = (item, status) => {
    if (item.value == 'archive_all') {
      orders
        .putOrderUpdateArchiveAll({
          orderIds: dataSource
            .map((item) => (item.status === status ? item._id : undefined))
            .filter((item) => item),
        })
        .then(() => setFilterQueryData());
    }
  };

  return (
    <div className={`${cssClass}__kanban_tab`}>
      <Spin spinning={loading}>
        <KanbanGroup
          kanbans={[
            <Kanban
              key={0}
              header={
                `${ORDERS_STATUS.PENDING} (` +
                data.filter((item) => item.status === ORDERS_STATUS.PENDING)
                  .length +
                ')'
              }
              carts={dataCardByStatus(
                dataSource,
                ORDERS_STATUS.PENDING,
                isEdit || isView,
              )}
            />,
            <Kanban
              key={1}
              header={
                `${ORDERS_STATUS.PROCESSING} (` +
                data.filter((item) => item.status === ORDERS_STATUS.PROCESSING)
                  .length +
                ')'
              }
              carts={dataCardByStatus(
                dataSource,
                ORDERS_STATUS.PROCESSING,
                isEdit || isView,
              )}
            />,
            <Kanban
              key={2}
              header={
                `${ORDERS_STATUS.READY_TO_SHIP} (` +
                data.filter(
                  (item) => item.status === ORDERS_STATUS.READY_TO_SHIP,
                ).length +
                ')'
              }
              carts={dataCardByStatus(
                dataSource,
                ORDERS_STATUS.READY_TO_SHIP,
                isEdit || isView,
              )}
            />,
            <Kanban
              key={4}
              header={
                `${ORDERS_STATUS.COMPLETED} (` +
                data.filter((item) => item.status === ORDERS_STATUS.COMPLETED)
                  .length +
                ')'
              }
              carts={dataCardByStatus(
                dataSource,
                ORDERS_STATUS.COMPLETED,
                isEdit || isView,
              )}
              isSetting
              onSettingChange={(item) =>
                onSettingChange(item, ORDERS_STATUS.COMPLETED)
              }
            />,
            <Kanban
              key={5}
              header={
                `${ORDERS_STATUS.CANCELLED} (` +
                data.filter((item) => item.status === ORDERS_STATUS.CANCELLED)
                  .length +
                ')'
              }
              carts={dataCardByStatus(
                dataSource,
                ORDERS_STATUS.CANCELLED,
                isEdit || isView,
              )}
              isSetting
              onSettingChange={(item) =>
                onSettingChange(item, ORDERS_STATUS.CANCELLED)
              }
            />,
          ]}
        />
      </Spin>
    </div>
  );
};

export default withRouter(KanbanTab);
