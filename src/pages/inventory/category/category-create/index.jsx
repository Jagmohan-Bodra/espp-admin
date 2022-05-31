import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification, Spin} from 'antd';

import {trans} from '~/components/public/Translate';
import {reqIsCreate, createCategory} from '~/reduxs/category/action.js';
import CategoryForm from '../category-form';
import PATH from '~/routers/path';
import {INVENTORY_PRODUCT_CATEGORY_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const CategoryCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.category.loading);
  const isCreate = useSelector((state) => state.category.isCreate);
  const ACCESS = {
    CREATE: isAccess(INVENTORY_PRODUCT_CATEGORY_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.INVENTORY_CATEGORY);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.INVENTORY_CATEGORY);
  };

  const onSave = (dataForm) => {
    dispatch(createCategory(dataForm));
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <CategoryForm
          onCancel={onCancel}
          onSave={onSave}
          isCreate={true}
          loading={loading}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(CategoryCreate);
