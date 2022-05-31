import React, {useEffect, useState} from 'react';
import {groupBy} from '~/helpers/common';
import GroupVariant from './GroupVariant';
import TypeVariant from './TypeVariant';
import './style.scss';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {confirmModalData} from '~/components/public/modals/ModalConfirmCommon/confirmModalFunc';
import {Col, Input, Row, Button, InputNumber} from 'antd';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';
import {VARIANT_TYPE} from '~/constants/master-data';

const VariantCreateForm = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  const onChange = (value) => {
    const newData = {
      ...data,
      ...value,
    };
    setData(newData);
    props.setData && props.setData(newData);
  };

  return (
    <div className={`variant-form`}>
      <Row>
        <Col span={6}>Group</Col>
        <Col span={18}>
          <Input
            value={data.group}
            onChange={(e) => onChange({group: e.target.value})}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>Type</Col>
        <Col span={18}>
          <SelectDefault
            data={[
              {key: VARIANT_TYPE.GALLERY, value: 'Gallery'},
              {key: VARIANT_TYPE.PHOTO, value: 'Photo'},
              {key: VARIANT_TYPE.PRODUCT_LIST, value: 'Product List'},
              {key: VARIANT_TYPE.RICHTEXT, value: 'Rich text'},
              {key: VARIANT_TYPE.TEXT, value: 'Text'},
              {key: VARIANT_TYPE.TREE, value: 'Tree'},
            ]}
            value={data.type || ''}
            onChange={(value) => onChange({type: value})}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>Label</Col>
        <Col span={18}>
          <Input
            value={data.label}
            onChange={(e) => onChange({label: e.target.value})}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>Key</Col>
        <Col span={18}>
          <Input
            value={data.key}
            onChange={(e) => onChange({key: e.target.value})}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>order</Col>
        <Col span={18}>
          <InputNumber
            value={data.order}
            onChange={(value) => onChange({order: value})}
          />
        </Col>
      </Row>
    </div>
  );
};

const VariantForm = (props) => {
  const [data, setData] = useState([]);
  const groups = groupBy(data, 'group');

  useEffect(() => {
    setData(
      (props.data || []).sort(
        (a, b) => parseFloat(a.order) - parseFloat(b.order),
      ),
    );
  }, [props.data]);

  const onChangeData = (id, value) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item._id == id);
    if (index > -1) {
      newData[index].value = value;
      setData(newData);
    }
  };

  const onSubmit = () => props.onSubmit && props.onSubmit(data);
  const onDiscard = () => props.onDiscard && props.onDiscard();

  const handleAddVariantClick = () => {
    confirmModalData(
      {
        header: 'Add new a Variant',
        closable: true,
        data: {},
        bodycomponent: VariantCreateForm,
      },
      handleAddVariant,
    );
  };

  const handleAddVariant = (params) => {
    props.onSubmitVariant &&
      props.onSubmitVariant(params).then((result) => {
        const newData = [...data, result.data].sort(
          (a, b) => parseFloat(a.order) - parseFloat(b.order),
        );
        setData(newData);
      });
  };

  return (
    <div>
      <Toolbox>
        <ButtonBlue text="Save" htmlType="submit" onClick={onSubmit} />
        <ButtonGray text="Discard" onClick={onDiscard} />
      </Toolbox>
      {groups.map((group, index) => (
        <GroupVariant title={group} key={index}>
          {data
            .map((item) => {
              if (item.group == group) {
                return (
                  <TypeVariant
                    key={item._id}
                    item={item}
                    onChangeData={(value) => onChangeData(item._id, value)}
                  />
                );
              }
            })
            .filter((item) => item)}
        </GroupVariant>
      ))}
      <div style={{textAlign: 'center'}}>
        <Button
          onClick={handleAddVariantClick}
          style={{
            width: '100%',
            padding: '10px',
            height: '40px',
            marginBottom: '50px',
          }}>
          {' '}
          Add a new Variant{' '}
        </Button>
      </div>
    </div>
  );
};

export default VariantForm;
