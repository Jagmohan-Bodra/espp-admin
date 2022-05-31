import React, {useState, useEffect} from 'react';
import {Modal} from 'antd';
import FormCurrency from './Form';

const ModelUpdate = (props) => {
  const [visible, setVisible] = useState(false);
  const [provisional, setProvisional] = useState({});
  let data = (props.data || []).find((item) => item.id === props.id) || {};

  useEffect(() => {
    setVisible(props.visible);
    setProvisional(data);
  }, [props.visible]);

  const handleSave = (data) => {
    props.handleSave && props.handleSave(props.id, data);
  };

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  return (
    <Modal
      title={<div className={`optimize-seo__modal_header`}>Edit Currency</div>}
      visible={visible}
      onCancel={handleCancel}
      wrapClassName={`optimize-seo__modal_warehouse`}
      width={'50%'}
      footer={null}>
      <FormCurrency
        data={provisional}
        setVisible={setVisible}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </Modal>
  );
};

export default ModelUpdate;
