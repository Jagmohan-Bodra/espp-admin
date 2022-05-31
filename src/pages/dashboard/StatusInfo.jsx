import {Space} from 'antd';
import React from 'react';

const StatusInfo = (props) => {
  const {text, color} = props;
  return (
    <div className={`status-info`}>
      <Space>
        <span
          className={`status-info_status`}
          style={{backgroundColor: color || '#41b6ff'}}
        />
        <span className={`status-info_text`}>{text}</span>
      </Space>
    </div>
  );
};

export default StatusInfo;
