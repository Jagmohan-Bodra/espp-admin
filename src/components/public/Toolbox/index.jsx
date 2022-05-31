import React from 'react';
import {Row, Col, Space} from 'antd';
import './style.scss';
const cssClass = 'toolbox-component';

export const Toolbox = (props) => {
  const {children, size, className, pullRight} = props;
  const cls = pullRight ? 'flex-right' : '';
  return (
    <div className={`${cssClass} ${cls} ${className}`}>
      <Space className={`${className}`} size={size || 'large'}>
        {children}
      </Space>
    </div>
  );
};

const ColumnAuto = (props) => {
  const {content, desktop, colClassName} = props;
  const phone = 24;
  return (
    <Col xl={desktop} lg={desktop} md={phone} sm={phone} xs={phone}>
      <div className={colClassName || ''}>{content}</div>
    </Col>
  );
};

export const ToolboxThree = (props) => {
  const {leftComponent, centerComponent, rightComponent, colClassName} = props;
  const gutter = [24, 16];

  return (
    <Row gutter={gutter}>
      <ColumnAuto
        desktop={8}
        content={leftComponent}
        colClassName={colClassName}
      />
      <ColumnAuto
        desktop={8}
        content={centerComponent}
        colClassName={colClassName}
      />
      <ColumnAuto
        desktop={8}
        content={rightComponent}
        colClassName={colClassName}
      />
    </Row>
  );
};
