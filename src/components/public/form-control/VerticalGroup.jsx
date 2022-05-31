import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';

const cssComponent = styleGlobal.P_HORIZONTAL_GROUP_FORMCONTROLER_COMPONENT;

const VerticalGroup = ({leftComponent, rightComponent}) => {
  return (
    <div className={`${cssComponent}__horizontal_group form-control`}>
      <span className={'label-control'}> {leftComponent} </span>
      {rightComponent}
    </div>
  );
};

export default VerticalGroup;
