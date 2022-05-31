import React from 'react';

import {trans} from '~/components/public/Translate';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';
import {ButtonActions} from '~/components/public/Button';
import {CURRENCY_COUNTRIES} from '~/constants/master-data';
import {isEmpty} from '~/helpers/validate';

export const ACTIONS_KEY = {
  EDIT_CURRENCY: 'EDIT_CURRENCY',
  DELETE: 'DELETE',
};

const columns = (props) => {
  return [
    {
      title: trans('Currency Name'),
      dataIndex: 'country',
      ellipsis: true,
      render: (text) =>
        !isEmpty(CURRENCY_COUNTRIES.find((item) => item.key == text))
          ? CURRENCY_COUNTRIES.find((item) => item.key == text).value
          : 'You have not selected a country',
    },
    {
      title: trans('Rate'),
      dataIndex: 'rate',
      ellipsis: true,
      render: (text) => text,
    },
    {
      title: trans('Status'),
      dataIndex: 'status',
      algin: 'center',
      render: (text) =>
        text == 'active' ? (
          <CheckIcon color="green" />
        ) : (
          <TimesIcon color="red" />
        ),
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
        {id: id, key: ACTIONS_KEY.EDIT_CURRENCY, name: 'Edit Currency'},
        {id: id, key: ACTIONS_KEY.DELETE, name: 'Delete'},
      ]}
    />
  );
};

export default columns;
