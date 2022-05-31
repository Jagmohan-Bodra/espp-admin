import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCategoryDetail, updateCategory} from '~/reduxs/category/action.js';
import CategoryForm from '../category-form';
import DeleteModal from '../category-delete';
import PATH from '~/routers/path';
import {
  INVENTORY_PRODUCT_CATEGORY_EDIT_PERMISSION_KEY,
  INVENTORY_PRODUCT_CATEGORY_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty, notification} from 'antd';
import {isAccess} from '~/helpers/utils';
import {trans} from '~/components/public/Translate';

const CategoryUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.category.loading);
  const obj = useSelector((state) => state.category.obj);
  const {id} = props.match.params;
  const ACCESS = {
    EDIT: isAccess(INVENTORY_PRODUCT_CATEGORY_EDIT_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_PRODUCT_CATEGORY_VIEW_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getCategoryDetail(id));
  }, []);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(PATH.INVENTORY_CATEGORY);
  };

  const onDiscard = () => {
    dispatch(getCategoryDetail(id));
  };

  const onSave = async (dataForm) => {
    ACCESS.EDIT && dispatch(updateCategory(id, dataForm));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.INVENTORY_CATEGORY);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <CategoryForm
        id={id}
        data={obj}
        onDelete={onDelete}
        onDiscard={onDiscard}
        onSave={onSave}
        loading={loading}
      />
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onSubmit={onCancel}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(CategoryUpdate);
