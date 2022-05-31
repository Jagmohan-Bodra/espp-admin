import React, {useState, useEffect} from 'react';
import {Modal} from 'antd';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const handlePreview = (
  setPreviewImage,
  setPreviewVisible,
  setPreviewTitle,
) => async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }

  setPreviewImage(file.url || file.preview),
    setPreviewVisible(true),
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
};

const ReviewModal = (props) => {
  const [previewVisible, setPreviewVisible] = useState(
    props.previewVisible || false,
  );
  const [previewImage, setPreviewImage] = useState(props.previewImage || '');
  const [previewTitle, setPreviewTitle] = useState(props.previewTitle || '');

  useEffect(() => {
    setPreviewVisible(props.previewVisible);
    setPreviewImage(props.previewImage);
    setPreviewTitle(props.previewTitle);
  }, [props]);

  const handleCancel = () => {
    props.setPreviewVisible
      ? props.setPreviewVisible(false)
      : setPreviewVisible(false);
  };
  return (
    <Modal
      visible={previewVisible}
      title={previewTitle}
      footer={null}
      onCancel={handleCancel}>
      <img alt="example" style={{width: '100%'}} src={previewImage} />
    </Modal>
  );
};

export default ReviewModal;
