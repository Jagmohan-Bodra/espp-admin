import React, {useEffect, useState} from 'react';
import {TreeSelect} from 'antd';
const {SHOW_PARENT} = TreeSelect;

export const TreeSelectBlock = (props) => {
  const valueDefault = [];
  const {treeData, value, onChange, clickToEdit} = props;
  const [isDisabled, setIsDisabled] = useState(props.isDisabled || true);

  useEffect(() => {
    setIsDisabled(props.isDisabled);
  }, [props.isDisabled]);

  const onClick = () => {
    clickToEdit && setIsDisabled(false);
  };

  return (
    <div onClick={onClick}>
      <TreeSelect
        treeData={treeData || []}
        value={value || valueDefault}
        onChange={onChange}
        treeCheckable={true}
        showCheckedStrategy={SHOW_PARENT}
        placeholder={'Please select'}
        style={{width: '100%'}}
        disabled={isDisabled}
      />
    </div>
  );
};
