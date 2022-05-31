import React from 'react';
import {getId} from './common';
import ReadOnlyExample from '~/components/public/slate/ReadOnlyExample';

export const Text = ({textValue, children, id, className}) => {
  return (
    <div className={`${className}`} id={getId(id)}>
      <ReadOnlyExample value={textValue} />
      {children}
    </div>
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    text: 'Hi',
    fontSize: 14,
    isNew: true,
    style: {},
    textValue: [
      {
        type: 'paragraph',
        children: [{text: 'Hello word'}],
      },
    ],
  },
};
