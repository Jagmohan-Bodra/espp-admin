import React, {useEffect, useState} from 'react';
import {InputAutoSaveBlock, RowForm} from '~/components/public/FormHelpers';
import {updateSettings, reqIsUpdate} from '~/reduxs/settings/action';
import {debounce} from '~/helpers/common';
import {useDispatch, useSelector} from 'react-redux';

const func = debounce((func) => func(), 3000);
const Inventory = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const loading = useSelector((state) => state.settings.loading);
  const isUpdate = useSelector((state) => state.settings.isUpdate);
  useEffect(() => {
    setData({
      ...data,
      inventory: (props.data || []).find(
        (item) => item.key === 'INVENTORY_SETTING',
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
            data={data.inventory}
            onBlur={true}
            label="Inventory Threshold"
            value={(data.inventory || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        }
      />
    </div>
  );
};

export default Inventory;
