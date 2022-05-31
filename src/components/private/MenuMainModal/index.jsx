import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from 'antd';
import MenuMain from '../MenuMain';
import {push} from '~/reduxs/routing/actions';

import './style.scss';
import {TimesIcon} from '~/public/assets/icon';
import UserDropdown from '~/components/public/UserDropdown';
import {reqGetMe} from '~/reduxs/me/action';

const MenuMainModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.visible || false);
  const me = useSelector((state) => state.me.data);

  useEffect(() => {
    me && dispatch(reqGetMe());
  }, []);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  const onMenuItemClick = (link) => {
    handleCancel();
    return link && dispatch(push(link));
  };

  return (
    <Modal
      style={{top: 0}}
      title={<TimesIcon onClick={handleCancel} />}
      className="modal-menu-main-custom"
      visible={visible}
      footer={null}
      closeIcon={<UserDropdown userInfo={me.data || {}} />}>
      <MenuMain onMenuItem={onMenuItemClick} />
    </Modal>
  );
};

export default MenuMainModal;
