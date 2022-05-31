import React from 'react';
import {Pagination, Space} from 'antd';
import './style.scss';

const cssClass = 'p_pagination_component';
const PaginationComponent = (props) => {
  const itemRender = (page, type, originalElement) => {
    if (type === 'prev') {
      return <a>{'< Prev'}</a>;
    }
    if (type === 'next') {
      return <a>{'Next >'}</a>;
    }
    return originalElement;
  };
  return (
    <div className={`${cssClass}`}>
      <Space size={props.size || 'middle'}>
        <Pagination itemRender={itemRender} {...props} />
      </Space>
    </div>
  );
};

export default PaginationComponent;
