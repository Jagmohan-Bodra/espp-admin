import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Col, Input, Row, Modal} from 'antd';
import {isEmpty} from 'lodash';

import {trans} from '~/components/public/Translate';
import CardSeoPreview from '~/components/public/card-seo-preview';
import UploadImage from '~/components/public/UploadImage';
import {uploadImageData} from '~/reduxs/upload/action';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
const cssClass = `cms-management-header-page`;

const RowForm = (props) => {
  const {text, form} = props;
  return (
    <Row gutter={[24, 16]}>
      <Col span={24}>
        <span className={'label-control'}>{text}</span>
        {form}
      </Col>
    </Row>
  );
};

const SeoPageForm = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(props.visible || false);

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  useEffect(() => {
    setVisible(props.visible || false);
  }, [props.visible]);

  const onChange = async (params) => {
    if (!isEmpty(params.fileImage)) {
      data.image = await dispatch(uploadImageData([params.fileImage]));
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
      visible={visible}
      footer={[
        <Toolbox key="toolbox" pullRight={true}>
          <ButtonBlue text="Save" htmlType="submit" onClick={onSubmit} />
          <ButtonGray text="Discard" onClick={onCancel} />
        </Toolbox>,
      ]}
      width="80%">
      <div className={`${cssClass}_seo_page_form`}>
        <Row gutter={[24, 16]}>
          <Col span={12}>
            <RowForm
              text={trans(`Title`)}
              form={
                <Input
                  className={'input-control'}
                  value={data.title}
                  onChange={(e) => onChange({title: e.target.value})}
                />
              }
            />
            <RowForm
              text={trans(`Description`)}
              form={
                <Input.TextArea
                  rows={4}
                  className={'textArea-control'}
                  value={data.description}
                  onChange={(e) => onChange({description: e.target.value})}
                />
              }
            />
          </Col>
          <Col span={12}>
            <CardSeoPreview data={data} className="card-preview-top" />
          </Col>
        </Row>

        <Row gutter={[24, 16]}>
          <Col span={12}>
            <RowForm
              text={trans(`Keywords`)}
              form={
                <Input.TextArea
                  rows={4}
                  className={'textArea-control'}
                  value={data.keywords}
                  onChange={(e) => onChange({keywords: e.target.value})}
                />
              }
            />
            <RowForm
              text={trans(`Upload an image for social share`)}
              form={
                <div className="box-avatar">
                  <UploadImage
                    labelButton="Upload Image"
                    imageUrl={data.image}
                    onChange={(file) => {
                      onChange({fileImage: file});
                    }}
                  />
                </div>
              }
            />
          </Col>
          <Col span={12}>
            <CardSeoPreview data={data} className="card-preview-image" />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default SeoPageForm;
