import React from 'react';
import {Col, Input, Form} from 'antd';
import {rulesConfirmPassword} from '~/helpers/utils';
const {Item} = Form;

const InputNewConfirmPassword = (props) => {
  const {
    data,
    nameNewPassword,
    nameConfirmNewPassword,
    onChange,
    spanCol,
  } = props;
  return (
    <>
      <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
        <span className={'label-control'}>{nameNewPassword}</span>
        <Item
          name={nameNewPassword}
          hasFeedback
          rules={[{required: true, min: 6}]}>
          <Input.Password
            size={'large'}
            value={data.newPassword}
            onChange={(e) => {
              onChange({newPassword: e.target.value});
            }}
          />
        </Item>
      </Col>
      <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
        <span className={'label-control'}>{nameConfirmNewPassword}</span>
        <Item
          name={nameConfirmNewPassword}
          dependencies={[nameNewPassword]}
          hasFeedback
          rules={rulesConfirmPassword('New Password')}>
          <Input.Password
            size={'large'}
            value={data.confirmNewPassword}
            onChange={(e) => {
              onChange({confirmNewPassword: e.target.value});
            }}
          />
        </Item>
      </Col>
    </>
  );
};

export default InputNewConfirmPassword;
