import React, {useState, useEffect} from 'react';
import {Modal} from 'antd';
import FormCurrency from './Form';

const ModelCreate = (props) => {
  const [visible, setVisible] = useState(props.visible || false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const handleSave = (data) => {
    props.handleSave && props.handleSave(data);
  };

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  return (
    <Modal
      title={
        <div className={`optimize-seo__modal_header`}>Add New Currency</div>
      }
      visible={visible}
      onCancel={handleCancel}
      wrapClassName={`optimize-seo__modal_warehouse`}
      width={'50%'}
      footer={null}>
      <FormCurrency
        setVisible={setVisible}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </Modal>
  );
};

export default ModelCreate;
