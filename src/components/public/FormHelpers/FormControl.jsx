import React from 'react';
import {Row, Col} from 'antd';
import {trans} from '~/components/public/Translate';
import './style.scss';

export const FormControl = (props) => {
  const cssClass = 'form-control-row';
  const {
    label,
    labelTop,
    children,
    span1,
    span2,
    offset,
    dicrection,
    className,
  } = props;
  return (
    <div className={`${cssClass} ${className || ''}`}>
      <Row>
        {label && (
          <Col span={span1 || 6} offset={offset || 0}>
            <label className={`${cssClass}_label`}>{trans(label)}</label>
          </Col>
        )}
        {labelTop && (
          <Col span={span1 || 24} offset={offset || 0}>
            <label className={`${cssClass}_label`}>{trans(labelTop)}</label>
          </Col>
        )}
        <Col span={span2 || 15} offset={offset || 0}>
          <div className={`${cssClass}_form center`}>{children}</div>
          {dicrection && (
            <p
              className={`${cssClass}_dicrecion`}
              dangerouslySetInnerHTML={{__html: dicrection}}></p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export const FromCard = (props) => {
  const cssClass = 'form-card-component';
  return (
    <div className={cssClass}>
      <div className={`${cssClass}__card`}>{props.children}</div>
    </div>
  );
};
