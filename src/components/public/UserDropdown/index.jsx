import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Dropdown, Menu, Avatar} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import styleGlobal from '~/public/assets/styleGlobal';
import {reqSignOut} from '~/reduxs/auth/action';
import {NO_IMAGE} from '~/config';
import {push} from '~/reduxs/routing/actions';
import ROUTER_PATH from '~/routers/path';
import './style.scss';
import {NotificationsIcon} from '~/public/assets/icon';

const cssClass = styleGlobal.P_USER_DROPDOWN_COMPONENT;

const MenuComponent = ({setVisible}) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(reqSignOut());
    setVisible(false);
  };

  const profile = () => {
    dispatch(push(ROUTER_PATH.ADMIN_PROFILE));
    setVisible(false);
  };
  return (
    <div className={`${cssClass}__menu_block`}>
      <Menu>
        <Menu.Item onClick={profile}>Profile</Menu.Item>
        <Menu.Item onClick={signOut}> Logout </Menu.Item>
      </Menu>
    </div>
  );
};

const UserDropdown = (props) => {
  const [visible, setVisible] = useState(false);
  const {firstName, lastName, email, notification, avatarFullPath} =
    props.userInfo || {};
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : email;
  return (
    <Dropdown
      overlay={
        <MenuComponent
          setVisible={setVisible}
          userInfo={props.userInfo}
          {...props}
        />
      }
      placement="topLeft"
      className={`${cssClass}`}
      onVisibleChange={setVisible}
      visible={visible}>
      <div
        className={`${cssClass}__block flex`}
        onClick={() => {
          props.history.push(ROUTER_PATH.ADMIN_ME_DETAILS);
        }}>
        <div className={`${cssClass}__block--notification`}>
          <NotificationsIcon size="lg" />
          {notification && <span>{notification}</span>}
        </div>
        <div className={`${cssClass}__block--avatar`}>
          <Avatar
            size={30}
            src={avatarFullPath || NO_IMAGE.USER}
            className={`${cssClass}_avatar-user`}
          />
        </div>
        <div className={`${cssClass}__block--content`}>
          <span className={`${cssClass}__block--content_title`}>
            {fullName}
          </span>
        </div>
        <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default withRouter(UserDropdown);
