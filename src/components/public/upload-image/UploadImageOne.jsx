import React, {useState, useEffect} from 'react';
import {Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {beforeUpload} from '~/helpers/upload';

const UploadButton = ({loading}) => (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{marginTop: 8}}>Upload</div>
  </div>
);

const UploadImageOne = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    setImageUrl(props.imageUrl);
  }, [props.imageUrl]);

  const onChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
        props.setImageUrl && props.setImageUrl(imageUrl);
      });
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  return (
    <div>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={onChange}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        disabled={props.isDisabled}>
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{width: '100%'}} />
        ) : (
          <UploadButton loading={loading} />
        )}
      </Upload>
    </div>
  );
};

export default UploadImageOne;
