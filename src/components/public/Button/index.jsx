import React from 'react';
import {Button, Menu, Dropdown} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {trans} from '~/components/public/Translate';
import {isEmpty} from '~/helpers/validate';

import './style.scss';
const cssClass = 'p_button_component';

export const ButtonBlue = (props) => {
  return (
    <Button
      {...props}
      size={props.size || 'default'}
      className={`${cssClass}__btn-main ${props.className || ''}`}>
      {props.textTran || trans(props.text)}
    </Button>
  );
};

export const ButtonGray = (props) => {
  return (
    <Button
      {...props}
      size={props.size || 'default'}
      className={`${cssClass}__btn-gray ${props.className || ''}`}>
      {props.textTran || trans(props.text)}
    </Button>
  );
};

export const ButtonDanger = (props) => {
  return (
    <Button
      {...props}
      size={props.size || 'default'}
      className={`${cssClass}__btn-danger ${props.className || ''}`}>
      {props.textTran || trans(props.text)}
    </Button>
  );
};

export const ButtonLink = (props) => {
  return (
    <Button
      {...props}
      size={props.size || 'default'}
      className={`${cssClass}__btn-link ${props.className || ''}`}>
      {props.textTran || trans(props.text)}
    </Button>
  );
};

export const ButtonActions = (props) => {
  const {data, onItem, className, size} = props;
  const getMenuItems = () => {
    if (!isEmpty(data)) {
      return data.map((item, index) => {
        return (
          <Menu.Item key={index} onClick={() => onItem && onItem(item)}>
            {item.name}
          </Menu.Item>
        );
      });
    }
  };

  return (
    <Dropdown
      className={className || 'btn-actions-component'}
      size={size || 'default'}
      overlay={<Menu>{getMenuItems()}</Menu>}>
      <Button>...</Button>
    </Dropdown>
  );
};

export const ButtonDropdownIcon = (props) => {
  const {
    text,
    textTran,
    data,
    onItem,
    className,
    iconRight,
    size,
    sizeButton,
  } = props;
  const getMenuItems = () => {
    if (!isEmpty(data)) {
      return data.map((item, index) => {
        return (
          <Menu.Item key={index} onClick={() => onItem && onItem(item)}>
            {item.name}
          </Menu.Item>
        );
      });
    }
  };

  return (
    <Dropdown size={size || 'default'} overlay={<Menu>{getMenuItems()}</Menu>}>
      <Button
        size={sizeButton || 'default'}
        className={`${cssClass}__btn-dropdown-gray ${className || ''}`}>
        {textTran || trans(text)} {iconRight || <DownOutlined />}
      </Button>
    </Dropdown>
  );
};
