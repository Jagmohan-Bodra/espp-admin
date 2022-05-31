import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Modal, Row, Col, Divider} from 'antd';
import {
  RowForm,
  InputBlock,
  FormControl,
  InputAreaBlock,
} from '~/components/public/FormHelpers';
import CardSeoPreview from '~/components/public/card-seo-preview';
import {UploadImageLink} from '~/components/public/UploadImage';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {isEmpty} from 'lodash';
import {uploadImageData} from '~/reduxs/upload/action';
import './style.scss';
import {getFullPath} from '~/helpers/utils';
const cssClass = `optimize-seo-page`;

const OptimizeSeoModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.visible || false);
  const [data, setData] = useState({});
  const phone = 24;

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  useEffect(() => {
    setVisible(props.visible || false);
  }, [props.visible]);

  const onChange = async (params) => {
    if (!isEmpty(params.fileImage)) {
      data.images = await dispatch(uploadImageData([params.fileImage]));
    }
    const newData = {
      ...data,
      ...params,
    };
    delete newData.fileImage;
    setData(newData);
    props.setData && props.setData(newData);
  };

  const onCancel = () => {
    setVisible(false);
    props.setVisible && props.setVisible(false);
  };

  const onSubmit = () => {
    props.onSubmit && props.onSubmit(props.idPage, data);
    setVisible(false);
    props.setVisible && props.setVisible(false);
    setData({});
  };

  return (
    <Modal
      title={<div className={`optimize-seo__modal_header`}>Optimize SEO</div>}
      visible={visible}
      onCancel={onCancel}
      wrapClassName={`optimize-seo__modal_warehouse`}
      width={'80%'}
      footer={null}>
      <div className={`${cssClass}`}>
        <Row gutter={[24]}>
          <Col xl={12} lg={12} md={phone} sm={phone} xs={phone}>
            <RowForm
              column={1}
              col1={
                <InputBlock
                  span2="24"
                  value={data.title}
                  onChange={(e) => onChange({title: e.target.value})}
                  labelTop="Title"
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <InputAreaBlock
                  span2="24"
                  labelTop="Description"
                  value={data.description}
                  onChange={(e) => onChange({description: e.target.value})}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <InputAreaBlock
                  span2="24"
                  labelTop="Keywords"
                  value={data.keywords}
                  onChange={(e) => onChange({keywords: e.target.value})}
                />
              }
            />
            <FormControl labelTop="Upload an image for social share">
              <UploadImageLink
                imageUrl={getFullPath(data.images)}
                onChange={(file) => onChange({images: file})}
                className={`${cssClass}__image-upload`}
              />
            </FormControl>
          </Col>
          <Col xl={12} lg={12} md={phone} sm={phone} xs={phone}>
            <CardSeoPreview data={data} className="card-preview-top" />
            <br />
            <CardSeoPreview data={data} className="card-preview-image" />
          </Col>
        </Row>
        <Divider className={'line-default'} />
        <div className={`${cssClass}__form_footer`}>
          <Toolbox>
            <ButtonBlue text="Save" onClick={onSubmit} />
            <ButtonGray text="Discard" onClick={onCancel} />
          </Toolbox>
        </div>
      </div>
    </Modal>
  );
};

export default OptimizeSeoModal;
