import React, {useState, useEffect} from 'react';
import {Row, Col, Divider, Form} from 'antd';
import {
  RowForm,
  InputBlock,
  SelectDefaultBlock,
} from '~/components/public/FormHelpers';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {CURRENCY_COUNTRIES, CURRENCY_STATUS} from '~/constants/master-data';
const cssClass = `optimize-seo-page`;

const FormCurrency = (props) => {
  const [data, setData] = useState({});
  const phone = 24;

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onSave = () => {
    props.handleSave && props.handleSave(data);
  };

  const onChangeData = (value) => {
    setData({
      ...data,
      ...value,
    });
  };

  const fields = [{name: ['Rate'], value: (data || {}).rate}];

  return (
    <Form
      name="basic"
      initialValues={{remember: true}}
      fields={fields}
      onFinish={onSave}>
      <div className={`${cssClass}`}>
        <Row gutter={[24]}>
          <Col xl={24} lg={24} md={phone} sm={phone} xs={phone}>
            <RowForm
              column={1}
              col1={
                <SelectDefaultBlock
                  span2="24"
                  value={(data || {}).country || 'Select Country'}
                  data={CURRENCY_COUNTRIES}
                  placeholder="Select Country"
                  labelTop="Country"
                  onChange={(value) => {
                    onChangeData({country: value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <Form.Item
                  name="Rate"
                  rules={[
                    {
                      pattern: /^[0-9]\d*\.?\d*$/,
                      message: 'Rate must be number',
                    },
                  ]}>
                  <InputBlock
                    span2="24"
                    labelTop="Rate"
                    value={(data || {}).rate}
                    placeholder="0.00000"
                    onChange={(e) => {
                      onChangeData({rate: e.target.value});
                    }}
                  />
                </Form.Item>
              }
            />
            <RowForm
              column={1}
              col1={
                <SelectDefaultBlock
                  span2="24"
                  value={(data || {}).status || 'Select Status'}
                  labelTop="Status"
                  data={CURRENCY_STATUS}
                  placeholder="Select Status"
                  onChange={(value) => {
                    onChangeData({status: value});
                  }}
                />
              }
            />
          </Col>
        </Row>
        <Divider className={'line-default'} />
        <div>
          <Toolbox>
            <ButtonBlue text="Save" htmlType="submit" />
            <ButtonGray text="Discard" onClick={props.handleCancel} />
          </Toolbox>
        </div>
      </div>
    </Form>
  );
};

export default FormCurrency;
