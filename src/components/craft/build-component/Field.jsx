import React from 'react';
import {getId} from './common';

export const Field = ({obj, text, id, className}) => {
  return (
    <div className={`${className || ''}`} id={getId(id)}>
      <span className={`craft-block`}>
        {(obj || {})[text] || text}
        {/* {children} */}
      </span>
    </div>
  );
};

Field.craft = {
  displayName: 'Field',
  props: {
    text: 'Field',
    fontSize: 14,
    isNew: true,
    style: {},
  },
};
