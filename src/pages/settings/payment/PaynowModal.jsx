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
const PaynowModal = (props) => {
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
          {`Edit Payment Method "PayNow"`}
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
                <Row>
                  <Col span={24} offset={0}>
                    <label className={`form-control-row_label`}>
                      {trans(`PayNow QR Code:`)}
                    </label>
                  </Col>
                  <Col span={24} offset={0}>
                    <UploadImageLink
                      className={`ta-l`}
                      labelButton="Upload Avatar"
                      imageUrl={provisional.qrcode}
                      onChange={(link) => {
                        onChangeData({qrcode: link});
                      }}
                    />
                  </Col>
                </Row>
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

export default PaynowModal;
