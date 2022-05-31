import React, {useState, useEffect} from 'react';
import {Modal} from 'antd';
import {ButtonDanger, ButtonGray} from '~/components/public/Button';
import './style.scss';
const cssClass = 'modal';

const RequestModel = (props) => {
  const [visible, setVisible] = useState(props.visible || false);
  const {header, body, width} = props;

  const handleSubmit = () => {
    props.handleSubmit && props.handleSubmit(false);
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    <Modal
      title={header}
      visible={visible}
      closable={false}
      width={width || 400}
      footer={
        <div className="toolbox-button-footer">
          <ButtonGray text="No" onClick={handleCancel} />
          <ButtonDanger text="Yes" onClick={handleSubmit} />
        </div>
      }>
      <div className={`${cssClass} form-control`}>{body}</div>
    </Modal>
  );
};

export default RequestModel;
