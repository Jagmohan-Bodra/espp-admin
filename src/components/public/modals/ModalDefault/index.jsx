import React, {useState, useEffect} from 'react';
import {Modal} from 'antd';
import './style.scss';

export const ModalDefault = (props) => {
  const [visible, setVisible] = useState(props.visible || false);
  const {title, footer, className} = props;

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  return (
    <Modal
      {...props}
      className={className || 'modal-default-custom'}
      visible={visible}
      title={title || null}
      footer={footer || null}
      onCancel={handleCancel}
    />
  );
};
