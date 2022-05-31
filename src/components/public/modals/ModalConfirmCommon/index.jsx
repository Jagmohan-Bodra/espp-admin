import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'antd';
import './style.scss';
const cssClass = 'modal-confirm';

let i = 1;
const ModalConfirmCommon = (props) => {
  const [visible, setVisible] = useState(props.visible || false);
  const [data, setData] = useState(props.data || {});

  const handleSubmit = () => {
    props.handleSubmit && props.handleSubmit(data);
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    props.cancelTest && props.cancelTest();
    setVisible(false);
  };

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  return (
    <Modal
      key={i}
      destroyOnClose
      maskClosable={false}
      className={`${cssClass}`}
      title={<b>{props.header || ''}</b>}
      visible={visible}
      closable={props.closable || false}
      onCancel={() => {
        setVisible(false);
        props.setVisible && props.setVisible(false);
      }}
      footer={
        !props.isDisableFooter && (
          <div className={`${cssClass}__footer`}>
            <Button className={'ant-btn cancel-btn'} onClick={handleCancel}>
              {' '}
              {props.labelNo || 'No'}{' '}
            </Button>
            <Button className={'ant-btn success-btn'} onClick={handleSubmit}>
              {' '}
              {props.labelYes || 'Yes'}{' '}
            </Button>
          </div>
        )
      }
      {...props}>
      <div className={`${cssClass} form-control`}>
        {props.body || ''}
        {props.bodycomponent && (
          <props.bodycomponent
            data={data}
            setData={(data) => setData(data)}
            items={props.items}
          />
        )}
      </div>
    </Modal>
  );
};

export default ModalConfirmCommon;
