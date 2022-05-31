import {Progress} from 'antd';
import React from 'react';

const ProgressCard = (props) => {
  const {text, value, percent, color} = props;
  return (
    <div className={`progress-card`}>
      <div className={`progress-card_info`}>
        <div className={`progress-card_info_left`}>{text}</div>
        <div className={`progress-card_info_right`}>{value}</div>
      </div>
      <Progress
        percent={percent}
        strokeColor={color}
        showInfo={false}
        className={`progress-card_progress`}
      />
    </div>
  );
};

export default ProgressCard;
