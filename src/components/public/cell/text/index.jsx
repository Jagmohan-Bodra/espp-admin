import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';

const cssClass = styleGlobal.P_TEXT_CELL;

const TextCell = ({text}) => {
  return <div className={`${cssClass}`}>{text}</div>;
};

export default TextCell;
