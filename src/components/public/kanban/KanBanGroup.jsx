import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import {Space} from 'antd';

const cssClass = styleGlobal.P_KANBAN_COMPONENT;

const KanBanGroup = (props) => {
  const {kanbans, className} = props;
  return (
    <div className={`${cssClass} kanban_group`}>
      <Space
        size={0}
        align="start"
        className={`kanban_group_space ${className && className}`}>
        {(kanbans || []).map((component) => component)}
      </Space>
    </div>
  );
};

export default KanBanGroup;
