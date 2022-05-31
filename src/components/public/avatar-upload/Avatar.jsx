import React from 'react';
import {Avatar} from 'antd';

const AvatarComponent = (props) => {
  const color = props.color || '#0000';
  const prop = {...props};
  !props.src && delete prop.src;

  return (
    <Avatar
      {...prop}
      style={{
        backgroundColor: color,
        border: '1px solid #6c757d',
      }}>
      {props.text || ''}
    </Avatar>
  );
};

export default AvatarComponent;
