import React, {useState, useEffect} from 'react';
import {Row, Col, Input, Form} from 'antd';
import {ButtonBlue} from '~/components/public/Button';
import {rulesConfirmPassword} from '~/helpers/utils';
import './style.scss';
const {Item} = Form;
const cssClass = 'component-change-password';
const spanCol = 24;

const ChangePasswordForm = (props) => {
  const [data, setData] = useState(props.data || {});

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onSubmitChange = () => props.onSubmitChange(data);
  const onFinish = () => props.onFinish(data);

  const {password, newPassword, confirmNewPassword} = data || {};
  return (
    <div className={`${cssClass}`}>
      <Form
        scrollToFirstError
        onFinish={onFinish}
        className={`${cssClass}__form`}>
        <div className={`${cssClass}__form-body`}>
          <Row gutter={[8, 8]}>
            <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
              <span className={`${cssClass}__label-control label-control`}>
                Current Password
              </span>
              <span style={{color: 'red'}}> *</span>
              <Item name="Current Password" rules={[{required: true}]}>
                <Input.Password
                  size={'large'}
                  value={password}
                  placeholder="Enter current password"
                  onChange={(e) => {
                    onChangeData({password: e.target.value});
                  }}
                />
              </Item>
            </Col>
            <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
              <span className={`${cssClass}__label-control label-control`}>
                New Password
              </span>
              <span style={{color: 'red'}}> *</span>
              <Item
                name="New Password"
                hasFeedback
                rules={[{required: true, min: 6}]}>
                <Input.Password
                  size={'large'}
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => {
                    onChangeData({newPassword: e.target.value});
                  }}
                />
              </Item>
            </Col>
            <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
              <span className={`${cssClass}__label-control label-control`}>
                Re-enter New Password
              </span>
              <span style={{color: 'red'}}> *</span>
              <Item
                name="Re-enter New Password"
                dependencies={['New Password']}
                hasFeedback
                rules={rulesConfirmPassword('New Password')}>
                <Input.Password
                  size={'large'}
                  value={confirmNewPassword}
                  placeholder="Re-enter new password"
                  onChange={(e) => {
                    onChangeData({confirmNewPassword: e.target.value});
                  }}
                />
              </Item>
            </Col>
          </Row>
        </div>

        <div className={`${cssClass}__form_footer`}>
          <br />
          <ButtonBlue
            htmlType="submit"
            onClick={onSubmitChange}
            text="Save Change"
          />
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
