import React from 'react';
import {AvatarMenu} from '~/components/public/Avatar';
import {MENU_ICONS} from '~/constants/menu';
import {isAccess} from '~/helpers/utils';
import './style.scss';
const cssClass = 'menu-main-component';

const MenuMain = ({onMenuItem}) => {
  return (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}__wrapper-menu-items`}>
        {(MENU_ICONS || [])
          .map((item, index) => {
            if (isAccess(item.rules)) {
              return (
                <AvatarMenu
                  key={index}
                  src={item.icon}
                  name={item.name}
                  onAvatarClick={() => onMenuItem(item.link)}
                />
              );
            }
          })
          .filter((item) => item)}
      </div>
    </div>
  );
};

export default MenuMain;
