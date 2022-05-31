import React from 'react';
import {Avatar} from 'antd';
import {trans} from '~/components/public/Translate';
import './style.scss';
const cssClass = 'p_avatar_component';
const IMAGE_DEFAULT = require('~/public/assets/images/no_image.png');

export const AvatarMenu = (props) => {
  const {src, name, size, shape, className, onAvatarClick} = props;
  const nameTran = name ? trans(name) : '';
  return (
    <div className={`${cssClass}`} onClick={onAvatarClick || undefined}>
      <Avatar
        className={`${cssClass}__avatar ${className}`}
        shape={shape || 'square'}
        size={size || 100}
        src={src || IMAGE_DEFAULT}
      />
      <span className={`${cssClass}__avatar-name ${className}`}>
        {nameTran}
      </span>
    </div>
  );
};

export const AvatarDefault = (props) => {
  const {src, name, size, shape, className, onAvatarClick} = props;
  const nameTran = name ? trans(name) : '';
  return (
    <div className={`${cssClass}`} onClick={onAvatarClick || undefined}>
      <Avatar
        className={`${cssClass}__avatar ${className}`}
        shape={shape || 'square'}
        size={size || 100}
        src={src || IMAGE_DEFAULT}
      />
      <span className={`${cssClass}__avatar-name ${className}`}>
        {nameTran}
      </span>
    </div>
  );
};
