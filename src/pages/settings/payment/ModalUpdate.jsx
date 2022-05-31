import React, {useState, useEffect} from 'react';
import {Modal, Row, Col, Divider} from 'antd';
import {
  RowForm,
  InputBlock,
  SwitchBlock,
  FormControl,
} from '~/components/public/FormHelpers';
import {Toolbox} from '~/components/public/Toolbox';
import HorizontalGroup from '~/components/public/form-control/HorizontalGroup';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import moment from 'moment';
import CkEditor from '~/components/public/ckeditor';

const cssClass = `optimize-seo-page`;
const ModelUpdate = (props) => {
  const [visible, setVisible] = useState(false);
  const [provisional, setProvisional] = useState({});
  let data = (props.data || []).find((item) => item.id === props.id) || {};
  const phone = 24;

  useEffect(() => {
    setVisible(props.visible);
    setProvisional(data);
  }, [props.visible]);

  const handleSave = () => {
    props.handleSave && props.handleSave(props.id, provisional);
  };

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  const onChangeData = (value) => {
    let date = new Date();
    setProvisional({...provisional, ...value, update: date});
  };

  return (
    <Modal
      title={
        <div className={`optimize-seo__modal_header`}>
          {`Edit Payment Method "PayPal"`}
        </div>
      }
      visible={visible}
      onCancel={handleCancel}
      wrapClassName={`optimize-seo__modal_warehouse`}
      width={'50%'}
      maskClosable={false}
      footer={null}>
      <div className={`${cssClass}`}>
        <Row gutter={[24]}>
          <Col xl={24} lg={24} md={phone} sm={phone} xs={phone}>
            <RowForm
              column={1}
              col1={
                <InputBlock
                  span2="24"
                  labelTop="Label"
                  value={provisional.label}
                  onChange={(e) => {
                    onChangeData({label: e.target.value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <InputBlock
                  span2="24"
                  labelTop="Client ID"
                  value={provisional.clientId}
                  onChange={(e) => {
                    onChangeData({clientId: e.target.value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <InputBlock
                  span2="24"
                  labelTop="Secret Key"
                  value={provisional.secretKey}
                  onChange={(e) => {
                    onChangeData({secretKey: e.target.value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <InputBlock
                  span2="24"
                  labelTop="Oauth URL"
                  value={provisional.oauthUrl}
                  onChange={(e) => {
                    onChangeData({oauthUrl: e.target.value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <InputBlock
                  span2="24"
                  labelTop="Order URL"
                  value={provisional.orderUrl}
                  onChange={(e) => {
                    onChangeData({orderUrl: e.target.value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <div className={`hook-secret-key`}>
                  <InputBlock
                    className={`hook-secret-key_left`}
                    span2="24"
                    labelTop="Web hook Secret key"
                    value={provisional.hookSecretKey}
                    onChange={(e) => {
                      onChangeData({hookSecretKey: e.target.value});
                    }}
                  />
                  <div className={`hook-secret-key_right`}>
                    <button className={`hook-secret-key_right_button`}>
                      Generate
                    </button>
                  </div>
                </div>
              }
            />
            <RowForm
              column={1}
              col1={
                <FormControl label={'Payment Instruction'} span2="24">
                  <CkEditor
                    value={provisional.instruction}
                    onChange={(text) => onChangeData({instruction: text})}
                  />
                </FormControl>
              }
            />
            {/* <RowForm
              column={1}
              col1={
                <FormControl 
                  label={'Payment Instruction'}
                  span2="24"
                >
                  <CkEditor
                    value={provisional.instruction}
                    onChange={(text) => onChangeData({instruction: text})}
                  />
                </FormControl>
              }
            /> */}
            {/* <RowForm
              column={1}
              col1={
                <Row>
                  <Col span={24} offset={0}>
                    <label className={`form-control-row_label`}>
                      {trans(`Enable Test Mode`)}
                    </label>
                  </Col>
                  <Col offset={0}>
                    <div className={`form-control-row_form center`}>
                      <Checkbox
                        checked={provisional.istest}
                        // value={provisional.istest}
                        onChange={(e) => {
                          onChangeData({istest: e.target.checked});
                        }}>
                        {trans(
                          `Check this option if you want to enable Paypal sanbox for testing`,
                        )}
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
              }
            />
            <RowForm
              column={1}
              col1={
                <InputBlock
                  span2="24"
                  labelTop="Paypal"
                  value={provisional.recipientEmail}
                  onChange={(e) => {
                    onChangeData({recipientEmail: e.target.value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <InputAreaBlock
                  span2="24"
                  labelTop="Payment Instruction"
                  value={provisional.paymentInstruction}
                  onChange={(e) => {
                    onChangeData({paymentInstruction: e.target.value});
                  }}
                />
              }
            /> */}
            <RowForm
              column={1}
              col1={
                <Row>
                  <Col offset={0}>
                    <div className={`form-control-row_form center`}>
                      <SwitchBlock
                        labelRight="Active"
                        checked={data.status}
                        onChange={(value) => onChangeData({status: value})}
                      />
                    </div>
                  </Col>
                </Row>
              }
            />
            <HorizontalGroup
              leftComponent="Date Created"
              rightComponent={moment(provisional.create).format(
                'DD MMM YYYY h:mm:ss a',
              )}
            />
            <HorizontalGroup
              leftComponent="Date Modified"
              rightComponent={moment(provisional.update).format(
                'DD MMM YYYY h:mm:ss a',
              )}
            />
          </Col>
        </Row>
        <Divider className={'line-default'} />
        <div>
          <Toolbox>
            <ButtonBlue text="Save" onClick={handleSave} />
            <ButtonGray text="Discard" onClick={handleCancel} />
          </Toolbox>
        </div>
      </div>
    </Modal>
  );
};

export default ModelUpdate;
