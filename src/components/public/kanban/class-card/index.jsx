import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import {Space, Tooltip} from 'antd';
import {BookOpenIcon, UserAltIcon, ClockIcon} from '~/public/assets/icon';

const cssClass = styleGlobal.P_KANBAN_COMPONENT;

const KanbanRow = ({icon, text}) => {
  return (
    <div className={`${cssClass}__kanban_row`}>
      <Space size={'small'} align="center">
        <span className={`${cssClass}__kanban_row--icon`}>{icon}</span>
        <Tooltip title={text}>
          <span className={`${cssClass}__kanban_row--text`}>{text}</span>
        </Tooltip>
      </Space>
    </div>
  );
};

const Body = ({lesson, teacher, time}) => {
  return (
    <div className={`${cssClass}__kanban_class_card_body`}>
      <Space direction="vertical">
        <KanbanRow icon={<BookOpenIcon />} text={lesson} />
        <KanbanRow icon={<UserAltIcon />} text={teacher} />
        <KanbanRow icon={<ClockIcon />} text={time} />
      </Space>
    </div>
  );
};

const Card = (props) => {
  const {lesson, teacher, time, disabled} = props;
  return (
    <div className={`${cssClass} kanban_class_card ${disabled && 'disabled'}`}>
      {!disabled && <Body lesson={lesson} teacher={teacher} time={time} />}
    </div>
  );
};

export default Card;
