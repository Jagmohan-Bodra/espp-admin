import {Modal} from 'antd';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import ReactCrop from 'react-image-crop';
import {trans} from '../../Translate';
import './style.scss';
import 'react-image-crop/lib/ReactCrop.scss';

const imageConfig = {
  maxWidth: 2280,
  maxHeight: 2280,
};

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          blob.name = fileName;
          resolve(blob);
        }
        reject();
      },
      null,
      1,
    );
  });
}

const ImageUploadOneModal = (props) => {
  const {img, handleSubmit} = props;
  const [visible, setVisible] = useState(false);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    height: 100,
    // aspect: 16 / 9
  });
  const imgRef = useRef(null);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const reset = () => {
    setCrop({
      unit: '%',
      width: 100,
      height: 100,
    });
  };

  const handleOk = async () => {
    const croppedImg = await getCroppedImg(imgRef.current, crop, 'testabc');
    handleSubmit && handleSubmit(croppedImg);
    setVisible(false);
    props.setVisible && props.setVisible(false);
    reset();
  };

  const handleCancel = () => {
    setVisible(false);
    props.setVisible && props.setVisible(false);
    reset();
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  return (
    <Modal
      title="Add Image"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      width={1300}
      DestOnClose>
      <div className={`image_upload_one`}>
        <div className={`image_upload_one_image_group`}>
          <ReactCrop
            src={img}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            maxWidth={imageConfig.maxWidth}
            maxHeight={imageConfig.maxHeight}
            style={{width: '100%'}}
            className={`image_upload_one_image`}
            crossorigin="anonymous"
          />
        </div>
        <div className={`image_upload_one_guideline`}>
          <div className={`image_upload_one_guideline_title`}>
            {trans(`Image upload rules`)}
          </div>
          <hr />
          <div className={`image_upload_one_guideline_list`}>
            <ul>
              <li>
                <span className={`b_700`}>
                  {trans(`Product image dimension`)}
                </span>
                :{` `}
                {trans(`width `)}:{' '}
                <span className={`red_2`}>{`${imageConfig.maxWidth}px`}</span>
                {` `}
                {trans(`height `)}:{' '}
                <span className={`red_2`}>{`${imageConfig.maxHeight}px`}</span>
              </li>
              <li>
                <span className={`b_700`}>
                  {trans(`Allowed product image extension`)}
                </span>
                :{` `}
                {trans(`.jpg | .jpeg | .gif | .png`)}
              </li>
              <li>
                <span className={`b_700`}>{trans(`Max file size`)}</span>:{` `}
                <span className={`red_2`}>5MB</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadOneModal;
