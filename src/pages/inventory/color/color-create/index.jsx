import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification} from 'antd';
import {reqIsCreate, createColor} from '~/reduxs/color/action';
import ColorForm from '../color-form';
import PATH from '~/routers/path';
import {INVENTORY_COLOR_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const ColorCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.color.loading);
  const isCreate = useSelector((state) => state.color.isCreate);
  const ACCESS = {
    CREATE: isAccess(INVENTORY_COLOR_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: 'Create successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.INVENTORY_COLOR);
    }
  }, [isCreate]);

  const onSave = (data) => {
    dispatch(createColor(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <ColorForm loading={loading} onSave={onSave} />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(ColorCreate);
