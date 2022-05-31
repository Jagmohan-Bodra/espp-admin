import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  InputAreaAutoSaveBlock,
  RowForm,
  InputAutoSaveBlock,
} from '~/components/public/FormHelpers';
import {updateSettings, reqIsUpdate} from '~/reduxs/settings/action';
import {debounce} from '~/helpers/common';

const func = debounce((func) => func(), 3000);
const General = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const loading = useSelector((state) => state.settings.loading);
  const isUpdate = useSelector((state) => state.settings.isUpdate);
  useEffect(() => {
    setData({
      ...data,
      shopName: (props.data || []).find(
        (item) => item.key === 'GENERAL_SHOP_NAME',
      ),
      shopAddress: (props.data || []).find(
        (item) => item.key === 'GENERAL_SHOP_ADDRESS',
      ),
    });
  }, [props.data]);

  const callUpdate = () => {
    dispatch(reqIsUpdate(false));
  };

  useEffect(() => {
    if (isUpdate) {
      func(callUpdate);
    }
  }, [isUpdate]);

  return (
    <div>
      <RowForm
        column={1}
        col1={
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.shopName}
            onBlur={true}
            label="Company Name"
            value={(data.shopName || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        }
      />
      <RowForm
        column={1}
        col1={
          <InputAreaAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.shopAddress}
            onBlur={true}
            label="Company Address"
            value={(data.shopAddress || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        }
      />
    </div>
  );
};

export default General;
