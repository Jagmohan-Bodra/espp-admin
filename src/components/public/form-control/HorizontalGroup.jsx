import React from 'react';
import {Row, Col} from 'antd';
import './style.scss';

const cssComponent = 'horizontal_group';

const HorizontalGroup = ({leftComponent, rightComponent}) => {
  return (
    <div className={`${cssComponent}__form-control`}>
      <Row>
        <Col span={8}>
          <span className={'label-control'}>{leftComponent}</span>
        </Col>
        <Col span={16}>
          <div className={`${cssComponent}_input-control`}>
            {rightComponent}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HorizontalGroup;
