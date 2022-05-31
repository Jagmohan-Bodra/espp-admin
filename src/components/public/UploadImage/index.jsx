import React, {useState, useEffect} from 'react';
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import Config from '~/config';
import './style.scss';
const ENDPOINT_UPLOAD_IMAGE = Config.API_URL + '/v1/drive/upload';

export const UploadImageMulti = (props) => {
  const [loading, setLoading] = useState(false);
  const [arrImage, setImageUrl] = useState([]);

  useEffect(() => {
    setImageUrl(props.arrImage || '');
  }, [props.arrImage]);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'removed') {
      props.remove && props.remove(info.file.url);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, () => setLoading(false));
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>{props.labelButton || ''}</div>
    </div>
  );

  return (
    // {(arrImage || []).map((item, index) => (
    //     <img key={index} src={item} alt="avatar" style={{ width: '25%', height: '100%' }} />
    // ))}
    <Upload
      disabled={props.disabled}
      name="files"
      listType="picture-card"
      className={props.className || 'avatar-uploader-public'}
      fileList={arrImage}
      action={ENDPOINT_UPLOAD_IMAGE}
      headers={{
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }}
      onChange={handleChange}>
      {arrImage.length >= 4 ? null : uploadButton}
    </Upload>
  );
};

// export default UploadImageMutil;

export const UploadImageLinkMulti = (props) => {
  const {labelButton, imageUrl, onChange, disabled, remove} = props;
  const arrImage = (imageUrl || []).map((item, index) => ({
    uid: index,
    url: item,
  }));

  const handleChange = async (file) => {
    // let imageLink = '';
    // if (!isEmpty(file)) {
    //   imageLink = await dispatch(uploadImageData([file]));
    // }
    const {fileOriginPath} =
      (((file || {}).response || {}).data || [])[0] || {};
    onChange && props.onChange(fileOriginPath);
  };

  return (
    <UploadImageMulti
      className={props.className}
      disabled={disabled}
      labelButton={labelButton || ''}
      arrImage={arrImage}
      onChange={handleChange}
      remove={remove}
    />
  );
};

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>{props.labelButton || ''}</div>
    </div>
  );

  return (
    // {(imageUrl || []).map((item, index) => (
    //     <img key={index} src={item} alt="avatar" style={{ width: '25%', height: '100%' }} />
    // ))}
    <Upload
      style={props.style}
      disabled={props.disabled}
      name="files"
      listType="picture-card"
      className={props.className || 'avatar-uploader-public'}
      showUploadList={false}
      action={ENDPOINT_UPLOAD_IMAGE}
      headers={{
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }}
      onChange={handleChange}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{width: '100%', maxHeight: '100%'}}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;

export const UploadImageLink = (props) => {
  const {labelButton, imageUrl, onChange, disabled} = props;

  const handleChange = async (file) => {
    const {fileOriginPath} =
      (((file || {}).response || {}).data || [])[0] || {};
    onChange && props.onChange(fileOriginPath);
  };

  return (
    <UploadImage
      className={props.className}
      style={props.style}
      disabled={disabled}
      labelButton={labelButton || ''}
      imageUrl={imageUrl}
      onChange={handleChange}
    />
  );
};
