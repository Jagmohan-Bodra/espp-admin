import React from 'react';
import {getId} from './common';

export const Image = (props) => {
  const {className, componentprops, id} = props;
  const backgroundImage = componentprops['background-image'];

  return (
    <div className={`${className || ''}`}>
      <span className={`craft-block`} data-id={`Image ${id}`}>
        <img
          src={backgroundImage}
          alt={componentprops.alt || ''}
          id={getId(id)}
        />
      </span>
    </div>
  );
};

Image.craft = {
  displayName: 'Image',
  props: {
    componentprops: {},
    style: {},
    className: '',
    isNew: true,
  },
};
