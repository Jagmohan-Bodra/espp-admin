import React, {useState, useEffect} from 'react';
import {Row, Col, Input, Form} from 'antd';
import {ButtonBlue} from '~/components/public/Button';
import './style.scss';
import {trans} from '~/components/public/Translate';

const {Item} = Form;
const cssClass = 'component-change-email';
const spanCol = 24;

const ChangeEmailForm = (props) => {
  const [data, setData] = useState(props.data || {});

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onSubmitChange = () => props.onSubmitChange(data);
  const onFinish = () => props.onFinish(data);

  return (
    <div className={`${cssClass}`}>
      <Form
        scrollToFirstError
        onFinish={onFinish}
        className={`${cssClass}__form`}
        fields={[{name: ['Email'], value: data.email}]}>
        <div className={`${cssClass}__form-body`}>
          <Row gutter={[8, 8]}>
            <Col xl={spanCol} lg={spanCol} md={24} sm={24} xs={24}>
              <span className={'label-control'} style={{fontWeight: '500'}}>
                New email
              </span>
              <span style={{color: 'red'}}>*</span>
              <Item name="Email" rules={[{required: true, type: 'email'}]}>
                <Input
                  size={'large'}
                  value={data.email}
                  placeholder="Enter new email"
                  onChange={(e) => {
                    onChangeData({email: e.target.value});
                  }}
                />
              </Item>
              <span style={{fontStyle: 'italic', fontSize: '12px'}}>
                {trans('The new password will be sent to this email.')}
              </span>
            </Col>
          </Row>
        </div>

        <div className={`${cssClass}__form_footer`}>
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

export default ChangeEmailForm;
