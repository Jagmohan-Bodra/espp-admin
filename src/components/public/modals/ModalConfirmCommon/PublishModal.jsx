import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {reqSetVisible} from '~/reduxs/modal/action';
import ConfirmModal from './index';

const PublishModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const okFunc = useSelector((state) => state.modal.okFunc);
  const cancelFunc = useSelector((state) => state.modal.cancelFunc);
  const propsModal = useSelector((state) => state.modal.propsModal);

  const _setVisible = (data) => {
    dispatch(reqSetVisible(data));
  };
  return (
    <ConfirmModal
      {...propsModal}
      visible={visible}
      setVisible={_setVisible}
      handleSubmit={(data) => okFunc(data)}
      cancelTest={cancelFunc}
    />
  );
};

export default PublishModal;
