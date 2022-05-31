import React from 'react';
import {Switch, Image} from 'antd';
import {trans} from '~/components/public/Translate';
import {ButtonActions} from '~/components/public/Button';
import '../style.scss';
export const ACTIONS_KEY = {
  EDIT_PAYMENT: 'EDIT_PAYMENT',
  // DELETE: 'DELETE',
};

const columns = (props) => {
  return [
    {
      title: trans('Payment Name'),
      dataIndex: 'name',
      ellipsis: true,
      render: (text, data) => (
        <div className={`payment-text-image`}>
          {text} <Image width={80} src={data.image} />
        </div>
      ),
    },
    {
      title: trans('Label'),
      dataIndex: 'label',
      ellipsis: true,
      render: (text) => text,
    },
    {
      title: trans('Status'),
      dataIndex: 'status',
      algin: 'center',
      render: (text) => <Switch checked={text} disabled={true} />,
    },
    {
      title: trans('Actions'),
      dataIndex: 'id',
      align: 'center',
      width: 80,
      render: (id) => handleAction(id, props),
    },
  ];
};

const handleAction = (id, props) => {
  return (
    <ButtonActions
      onItem={props.onActionItem}
      data={[
        {id: id, key: ACTIONS_KEY.EDIT_PAYMENT, name: 'Edit Payment'},
        // { id: id, key: ACTIONS_KEY.DELETE, name: 'Delete' }
      ]}
    />
  );
};

export default columns;
