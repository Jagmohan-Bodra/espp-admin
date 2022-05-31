import React from 'react';
import {Row, Col} from 'antd';

export const RowForm = (props) => {
  const {column, col1, col2, col3, col4} = props;
  const gutter = [24, 16];
  const desktop = 24 / column;
  const phone = 24;

  const getColumn = (content) => {
    return (
      <Col xl={desktop} lg={desktop} md={phone} sm={phone} xs={phone}>
        {content}
      </Col>
    );
  };

  const getRow = () => {
    if (column == 4) {
      return (
        <Row gutter={gutter}>
          {getColumn(col1)}
          {getColumn(col2)}
          {getColumn(col3)}
          {getColumn(col4)}
        </Row>
      );
    }
    if (column == 3) {
      return (
        <Row gutter={gutter}>
          {getColumn(col1)}
          {getColumn(col2)}
          {getColumn(col3)}
        </Row>
      );
    }
    if (column == 2) {
      return (
        <Row gutter={gutter}>
          {getColumn(col1)}
          {getColumn(col2)}
        </Row>
      );
    }
    if (column == 1) {
      return <Row gutter={gutter}>{getColumn(col1)}</Row>;
    }
  };
  return getRow();
};
