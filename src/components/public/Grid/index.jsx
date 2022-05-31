import React from 'react';
import {Row, Col} from 'antd';

export const ColAuto = (props) => {
  const {desktop, tablet, phone, children} = props;
  const desktopA = desktop || 24;
  return (
    <Col
      xl={desktopA}
      lg={desktopA}
      md={tablet || desktopA}
      sm={phone || 24}
      xs={phone || 24}
      {...props}>
      {children}
    </Col>
  );
};

export const RowAuto = (props) => {
  const {gutter, children} = props;
  return (
    <Row gutter={gutter || [24, 16]} {...props}>
      {children}
    </Row>
  );
};
