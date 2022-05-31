import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getTagDetail, updateTag, reqIsUpdate} from '~/reduxs/tag/action';
import TagForm from '../tag-form';
import DeleteModal from '../tag-delete';
import PATH from '~/routers/path';
import {
  INVENTORY_TAG_EDIT_PERMISSION_KEY,
  INVENTORY_TAG_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty, notification} from 'antd';
import {trans} from '~/components/public/Translate';

const TagUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.tag.loading);
  const obj = useSelector((state) => state.tag.obj);
  const isUpdate = useSelector((state) => state.tag.isUpdate);
  const {id} = props.match.params;
  const ACCESS = {
    EDIT: isAccess(INVENTORY_TAG_EDIT_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_TAG_VIEW_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getTagDetail(id));
  }, []);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(PATH.CRM_CUSTOMER);
  };

  const onDiscard = () => {
    dispatch(getTagDetail(id));
  };

  const onSave = (dataForm) => {
    ACCESS.EDIT && dispatch(updateTag(id, dataForm));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.INVENTORY_TAG);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <TagForm
        id={id}
        data={obj}
        onDelete={onDelete}
        onDiscard={onDiscard}
        onSave={onSave}
        isUpdate={isUpdate}
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

export default withRouter(TagUpdate);
