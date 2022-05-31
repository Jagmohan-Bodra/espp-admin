import React, {useState, useEffect} from 'react';
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import './style.scss';
import Config from '~/config';
const ENDPOINT_UPLOAD_IMAGE = Config.API_URL + '/v1/drive/upload';

const UploadImage = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(props.imageUrl || '');
  }, [props.imageUrl]);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
      props.onChange && props.onChange(info.file);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed. Try again!`);
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>{props.labelButton || 'Upload'}</div>
    </div>
  );

  return (
    <Upload
      name="files"
      listType="picture-card"
      className={props.className || 'avatar-uploader-public'}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      showUploadList={false}
      action={ENDPOINT_UPLOAD_IMAGE}
      headers={{
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }}>
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{width: '100%'}} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
