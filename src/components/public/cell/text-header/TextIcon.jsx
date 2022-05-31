import React from 'react';
import TextHeader from './index';

const cssClass = 'p_text_header_cell';
const TextHeaderCell = ({leftComponent, rightComponent, onClick}) => {
  return (
    <div className={`${cssClass}__text_icon`} onClick={onClick && onClick}>
      <TextHeader name={leftComponent} />
      {rightComponent || ''}
    </div>
  );
};

export default TextHeaderCell;
