import React, {useEffect, useState} from 'react';
import {InputAutoSaveBlock, RowForm} from '~/components/public/FormHelpers';
import {updateSettings, reqIsUpdate} from '~/reduxs/settings/action';
import {debounce} from '~/helpers/common';
import {useDispatch, useSelector} from 'react-redux';

const func = debounce((func) => func(), 3000);
const OderSetting = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const loading = useSelector((state) => state.settings.loading);
  const isUpdate = useSelector((state) => state.settings.isUpdate);
  useEffect(() => {
    setData({
      ...data,
      minimumDeliveryValue: (props.data || []).find(
        (item) => item.key === 'MINIMUM_DELIVERY_VALUE',
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
            data={data.minimumDeliveryValue}
            onBlur={true}
            label="Minimum Delivery Value (SGD):"
            value={(data.minimumDeliveryValue || {}).value}
            loading={loading}
            isUpdate={isUpdate}
            type={'number'}
          />
        }
      />
    </div>
  );
};

export default OderSetting;
