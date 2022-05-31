import React, {useState, useEffect} from 'react';
import {Button, Space} from 'antd';
import {
  ButtonKanbanBlueIcon,
  ButtonListBlueIcon,
  ButtonKanbanWhiteIcon,
  ButtonListWhiteIcon,
  ButtonUserIcon,
} from '~/public/assets/icon';
import './style.scss';
const cssClass = 'p_screen_switch_button_component';

const ItemSwitchBtn = (props) => {
  const {itemicon, pclassName, itemiconactive} = props;
  return (
    <Button
      icon={props.pdisabled ? itemiconactive : itemicon}
      className={`${pclassName} ${props.className || ''}`}
      onClick={(e) => {
        props.ponClick(e);
        props.onClick(e);
      }}
      disabled={props.pdisabled}></Button>
  );
};

const NullItemSwitchBtn = (props) => {
  const {pclassName, text} = props;
  return (
    <Button
      className={`${pclassName} ${props.className || ''}`}
      onClick={(e) => {
        props.ponClick(e);
        props.onClick(e);
      }}
      disabled={props.pdisabled}>
      {text}
    </Button>
  );
};

export const TabsSwitchBtn = (props) => (
  <ItemSwitchBtn
    itemicon={<ButtonKanbanBlueIcon />}
    itemiconactive={<ButtonKanbanWhiteIcon />}
    {...props}
  />
);
export const ListSwitchBtn = (props) => (
  <ItemSwitchBtn
    itemicon={<ButtonListBlueIcon />}
    itemiconactive={<ButtonListWhiteIcon />}
    {...props}
  />
);
export const DateSwitchBtn = (props) => (
  <ItemSwitchBtn
    itemicon={<ButtonUserIcon color={`#201389`} />}
    itemiconactive={<ButtonUserIcon />}
    {...props}
  />
);
export const TextSwitchBtn = (props) => <NullItemSwitchBtn {...props} />;

const SwitchButton = (props) => {
  const {itemSwitchBtns, select, isNotBlock} = props;
  const [active, setActive] = useState(select || 0);
  useEffect(() => {
    setActive(select);
  }, [select]);
  return (
    <div className={`${cssClass}`}>
      <Space size={3}>
        {(itemSwitchBtns || []).map((Btn, index) => (
          <Btn
            key={index}
            pclassName={active == index && 'active'}
            ponClick={() => setActive(index)}
            pdisabled={!isNotBlock && active == index}
          />
        ))}
      </Space>
    </div>
  );
};

export default SwitchButton;
