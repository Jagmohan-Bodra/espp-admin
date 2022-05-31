import React, {useState, useEffect} from 'react';
import {Element, Leaf} from './Richtext';

const ReadOnlyExample = (prop) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(prop.value);
  }, [prop.value]);

  const renderLeaf = (leaf, index) => (
    <Leaf
      key={index}
      leaf={{...leaf}}
      attributes={leaf.attributes}
      // {...leaf.attributes}
    >
      {leaf.text}
    </Leaf>
  );

  const renderElement = (element, index) => (
    <Element
      key={index}
      attributes={element.attributes}
      element={element}
      children={(element.children || []).map((elementItem, elementIndex) =>
        elementItem.type
          ? renderElement(elementItem, elementIndex)
          : renderLeaf(elementItem, elementIndex),
      )}
    />
  );

  return (
    <div>{(value || []).map((item, index) => renderElement(item, index))}</div>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '...',
      },
    ],
  },
];

export default ReadOnlyExample;
