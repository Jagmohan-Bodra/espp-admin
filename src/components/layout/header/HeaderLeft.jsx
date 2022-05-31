import React, {useState} from 'react';
import {withRouter, NavLink, useLocation} from 'react-router-dom';
import {Menu, Space} from 'antd';

import {adminHeaderMenuOptions} from '~/routers/options';
import {BlocksIcon} from '~/public/assets/icon';
import {trans} from '~/components/public/Translate';
import MenuMainModal from '~/components/private/MenuMainModal';
import PATH from '~/routers/path';
import {isEmpty} from '~/helpers/validate';
import './style.scss';
import {isAccess} from '~/helpers/utils';

const {Item} = Menu;
const cssComponent = 'header-component';
const cssClass = `cms-management-header-page`;

const HeaderLeft = (props) => {
  const pathCurrent = props.match.path;
  const [isShowMenu, setIsShowMenu] = useState(false);
  const location = useLocation();

  const onMenuMain = () => {
    setIsShowMenu(true);
  };

  const renderMenuItem = (item, index, pathname) => {
    if (item.isTitleGroup) {
      return (
        <Item key={index} className={`${cssComponent}__title-group`}>
          {trans(item.name)}
        </Item>
      );
    }

    return (
      <Item key={index} data-index={item.path}>
        <NavLink
          to={item.path || pathname}
          className={`${cssComponent}__nav-link`}>
          {trans(item.name)}
        </NavLink>
      </Item>
    );
  };

  const handlerMenuItemLeft = () => {
    const list = pathCurrent.split('/');
    const module = !isEmpty(list[1]) ? list[1] : PATH.DASHBOARD;
    const menuLeftHeader = !isEmpty(adminHeaderMenuOptions[module])
      ? adminHeaderMenuOptions[module]
      : [];
    return (
      <>
        {menuLeftHeader.map((item, index) => {
          if (item.isMenu && isAccess(item.rules)) {
            return renderMenuItem(item, index, location.pathname);
          }
        })}
      </>
    );
  };

  return (
    <div className="header-menu-left-default">
      <Menu
        mode="horizontal"
        theme="dark"
        className={`${cssClass}_menu`}
        triggerSubMenuAction={`hover`}>
        <Item key="toggle_sidebar" onClick={onMenuMain}>
          <Space>
            <BlocksIcon />
          </Space>
        </Item>
        {handlerMenuItemLeft()}
        {props.menuItemExtra || null}
      </Menu>
      <MenuMainModal visible={isShowMenu} setVisible={setIsShowMenu} />
    </div>
  );
};

export default withRouter(HeaderLeft);
