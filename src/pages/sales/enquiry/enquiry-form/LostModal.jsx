import React, {useState} from 'react';
import {Col, Row} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import {ButtonDanger, ButtonGray} from '~/components/public/Button';
import {trans} from '~/components/public/Translate';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';
import {ENQUIRY_REASON_OPTION} from '~/constants/master-data';

export default (props) => {
  const {visible, handleCancel, handleSubmit} = props;
  const [value, setValue] = useState();

  return (
    <Modal
      title={
        <span style={{color: `#4B5B79`, lineHeight: `2em`, fontWeight: `bold`}}>
          {trans(`Lost Reason`)}
        </span>
      }
      visible={visible}
      closable={false}
      width={400}
      footer={
        <div className="toolbox-button-footer">
          <ButtonGray text="Cancel" onClick={handleCancel} />
          <ButtonDanger text="Submit" onClick={() => handleSubmit(value)} />
        </div>
      }>
      <div className={`form-control`}>
        <Row>
          <Col span={6}>
            <span style={{color: `#4B5B79`, lineHeight: `2em`}}>
              {' '}
              {trans(`Lost Reason`)}
            </span>
          </Col>
          <Col span={18}>
            <SelectDefault
              data={ENQUIRY_REASON_OPTION}
              value={value}
              onChange={setValue}
              // keyoption={}
              // nameoption={}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
