import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification} from 'antd';
import {reqIsCreate, createTag} from '~/reduxs/tag/action';
import TagForm from '../tag-form';
import PATH from '~/routers/path';
import {INVENTORY_TAG_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const TagCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tag.loading);
  const isCreate = useSelector((state) => state.tag.isCreate);
  const ACCESS = {
    CREATE: isAccess(INVENTORY_TAG_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: 'Create successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.INVENTORY_TAG);
    }
  }, [isCreate]);

  const onSave = (data) => {
    dispatch(createTag(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <TagForm loading={loading} onSave={onSave} />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(TagCreate);
