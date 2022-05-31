import React from 'react';
import {Col, Input, Form} from 'antd';
import {rulesConfirmPassword} from '~/helpers/utils';
const {Item} = Form;

const InputConfirmPassword = (props) => {
  const {data, labelPassword, labelConfirmPassword, onChange, spanCol} = props;
  return (
    <>
      <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
        <span className={'label-control'}>{labelPassword}</span>
        <Item
          name={labelPassword}
          hasFeedback
          rules={[{required: true, min: 6}]}>
          <Input.Password
            size={'large'}
            value={data.password}
            onChange={(e) => {
              onChange({password: e.target.value});
            }}
          />
        </Item>
      </Col>
      <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
        <span className={'label-control'}>{labelConfirmPassword}</span>
        <Item
          name={labelConfirmPassword}
          dependencies={[labelPassword]}
          hasFeedback
          rules={rulesConfirmPassword('Password')}>
          <Input.Password
            size={'large'}
            value={data.confirmPassword}
            onChange={(e) => {
              onChange({confirmPassword: e.target.value});
            }}
          />
        </Item>
      </Col>
    </>
  );
};

export default InputConfirmPassword;
