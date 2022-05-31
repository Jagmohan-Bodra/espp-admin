import React from 'react';
import {Avatar as AntdAvatar} from 'antd';
import {getId} from './common';

export const Avatar = (props) => {
  const {className, componentprops, children, id} = props;

  const backgroundImage = componentprops['background-image'];
  const backgroundSize = componentprops['background-size'];

  return (
    <div className={`${className || ''}`}>
      <AntdAvatar
        id={getId(id)}
        size={backgroundSize}
        src={backgroundImage}
        shape={componentprops.shape || 'square'}>
        {children} {componentprops.alt || ''}
      </AntdAvatar>
    </div>
  );
};

Avatar.craft = {
  displayName: 'Avatar',
  props: {
    componentprops: {},
    style: {},
    className: '',
    isNew: true,
  },
};
