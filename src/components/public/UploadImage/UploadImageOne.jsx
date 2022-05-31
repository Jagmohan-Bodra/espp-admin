import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Upload, message, Space, Modal} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {reqUploadImage} from '~/reduxs/upload/action';
import Config from '~/config';
import './style.scss';
import {isEmpty} from '~/helpers/validate';
import ImageUploadOneModal from '../modals/image-upload/ImageUploadOneModal';
import {CropIcon, TrashIcon} from '~/public/assets/icon';
import {getFullPath} from '~/helpers/utils';
const ENDPOINT_UPLOAD_IMAGE = Config.API_URL + '/v1/drive/upload';

const UploadImage = (props) => {
  const {handleDelete, handleCrop} = props;
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
      getBase64(info.file.originFileObj, () => {
        setLoading(false);
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

  const handleDeleteClick = () => {
    Modal.confirm({
      title: 'Delete',
      // icon: <ExclamationCircleOutlined />,
      content: 'Do you want to delete!',
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => handleDelete && handleDelete(),
    });
  };

  return (
    // {(imageUrl || []).map((item, index) => (
    //     <img key={index} src={item} alt="avatar" style={{ width: '25%', height: '100%' }} />
    // ))}
    <div>
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
        onPreview={props.handlePreview && props.handlePreview}
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
      {imageUrl && !props.disabled ? (
        <Space
          size={`large`}
          style={{display: 'flex', justifyContent: 'center'}}>
          {handleCrop && (
            <div>
              <CropIcon
                color={`#82c91e`}
                style={{fontSize: '18px', cursor: 'pointer'}}
                onClick={handleCrop}
              />
            </div>
          )}
          {handleDelete && (
            <div>
              <TrashIcon
                color={`red`}
                style={{fontSize: '18px', cursor: 'pointer'}}
                onClick={handleDeleteClick}
              />
            </div>
          )}
        </Space>
      ) : (
        ''
      )}
    </div>
  );
};

export const UploadImageOne = (props) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState();
  const [visible, setVisible] = useState(false);
  const {labelButton, imageUrl, onChange, disabled} = props;

  useEffect(() => {
    setImg(imageUrl);
  }, [imageUrl]);

  const handleChange = async (file) => {
    if (!isEmpty(file)) {
      const {fileOriginPath} =
        (((file || {}).response || {}).data || [])[0] || {};
      setImg(getFullPath(fileOriginPath));
      setVisible(true);
    }
  };

  const handleSubmit = async (result) => {
    const imageLink = await dispatch(reqUploadImage(await result));
    const {fileOriginPath} = ((imageLink || {}).data || [])[0] || {};
    setImg(getFullPath(fileOriginPath));
    onChange && props.onChange(fileOriginPath);
  };

  const handleCrop = () => {
    setVisible(true);
  };
  const handleDelete = () => {
    setImg('');
    props.onChange('');
  };

  return (
    <div>
      <UploadImage
        className={props.className}
        showUploadList={false}
        style={props.style}
        disabled={disabled}
        labelButton={labelButton || ''}
        imageUrl={imageUrl}
        onChange={handleChange}
        handleDelete={handleDelete}
        handleCrop={handleCrop}
      />
      <ImageUploadOneModal
        img={img}
        handleSubmit={handleSubmit}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};
