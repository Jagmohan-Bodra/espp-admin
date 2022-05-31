import React, {useState} from 'react';
import {getId} from './common';

export const BasicMenu = (props) => {
  const {className, data, id} = props;

  const LiComponent = (props) => {
    const {item, index, className, isActive} = props;
    const {title, iconData, path, children} = item;
    const [show, setShow] = useState(false);
    const isDropdown = (children || []).length != 0;

    const handleShow = () => {
      if (isDropdown) {
        setShow(!show);
      }
    };
    return (
      <li
        key={index}
        className={`${className} ${isDropdown ? 'dropdown' : ''} ${
          isActive ? 'active' : ''
        }`}>
        <a
          href={`${path || '#'}`}
          className={`${className}_link ${
            isDropdown ? 'dropdown-toggle' : ''
          } ${show ? 'show' : ''}`}
          onClick={handleShow}>
          {iconData} {title}
        </a>
        {isDropdown && (
          <ul className={`${className}_dropdown ${show ? 'show' : ''}`}>
            {children.map((item, index) => (
              <LiComponent
                key={index}
                item={item}
                index={index}
                className={`${className}_sub`}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={`${className || ''}`} id={getId(id)} key={id}>
      <div className={`craft-block`}>
        <ul className={`basic-menu`}>
          {(data || []).map((item, index) => (
            <LiComponent
              key={index}
              item={item}
              index={index}
              className={`menu_item`}
              isActive={index == 0}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

BasicMenu.craft = {
  displayName: 'BasicMenu',
  props: {
    className: '',
    isNew: true,
    data: [
      {
        key: 'home',
        title: 'Home title',
        iconData: '',
        path: '#',
        shortCode: '',
      },
      {
        key: 'home1',
        title: 'Home title 1',
        iconData: '',
        path: '#',
        shortCode: '',
      },
    ],
  },
};
