import React, {useState, useEffect} from 'react';
import {Space, Avatar, Upload, Spin, message} from 'antd';
const cssClass = 'admin_page';

const AvatarUpload = (props) => {
  const imageNull =
    'https://developers.google.com/web/images/contributors/no-photo.jpg';
  const [imageUrl, setImageUrl] = useState(props.imageUrl || imageNull);
  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    setImageUrl(props.imageUrl || imageNull);
  }, [props.imageUrl]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoadding(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoadding(false);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        props.setOriginFileObj &&
          props.setOriginFileObj(info.file.originFileObj);
      });
    }
    if (info.file.status === 'error') {
      setLoadding(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <div className={`${cssClass}__avatar_upload`}>
      <Space
        direction="vertical"
        size={'small'}
        style={{width: '100%'}}
        align="center">
        <Spin spinning={loadding}>
          <Avatar src={`${imageUrl}`} size={128} />
        </Spin>
        <Upload
          showUploadList={false}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          <a href="#">Change Image</a>
        </Upload>
      </Space>
    </div>
  );
};

export default AvatarUpload;
