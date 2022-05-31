import React, {useState, useEffect} from 'react';
import {Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {beforeUpload} from '~/helpers/upload';
import ReviewModal, {handlePreview} from './ReviewModal';

const UploadButton = ({loading}) => (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{marginTop: 8}}>Upload</div>
  </div>
);

const UploadImage = (props) => {
  const [loading] = useState(false);
  const [fileList, setFileList] = useState(props.fileList || []);

  const [previewVisible, setPreviewVisible] = useState(
    props.previewVisible || false,
  );
  const [previewImage, setPreviewImage] = useState(props.previewImage || '');
  const [previewTitle, setPreviewTitle] = useState(props.previewTitle || '');

  useEffect(() => {
    setFileList(props.fileList || []);
  }, [props.fileList]);

  const onChange = ({fileList}) => {
    const files = fileList.filter((file) => !!file.status);
    setFileList(files);
    props.setFileList && props.setFileList(files);
  };

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={onChange}
        onPreview={handlePreview(
          setPreviewImage,
          setPreviewVisible,
          setPreviewTitle,
        )}>
        {fileList.length >= 8 ? null : <UploadButton loading={loading} />}
      </Upload>
      <ReviewModal
        previewVisible={previewVisible}
        previewImage={previewImage}
        previewTitle={previewTitle}
        setPreviewVisible={setPreviewVisible}
      />
    </div>
  );
};

export default UploadImage;
