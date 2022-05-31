import React, {useEffect, useState} from 'react';
import {Switch} from 'antd';
import './style.scss';

export const SwitchBlock = (props) => {
  const {labelLeft, labelRight} = props;
  const [isDisabled, setIsDisabled] = useState(props.isDisabled || false);
  const [checked, setChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  useEffect(() => {
    setIsDisabled(props.isDisabled);
  }, [props.isDisabled]);

  const onChange = (value) => {
    setChecked(value);
    props.onChange && props.onChange(value);
  };

  return (
    <div className={'switch-block-component'}>
      {labelLeft && (
        <span className={`switch-block-text-left ${checked ? 'active' : ''}`}>
          {labelLeft}
        </span>
      )}
      <Switch checked={checked} onChange={onChange} disabled={isDisabled} />
      {labelRight && (
        <span className={`switch-block-text-right ${checked ? 'active' : ''}`}>
          {labelRight}
        </span>
      )}
    </div>
  );
};
