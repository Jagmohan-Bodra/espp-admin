import React from 'react';
import {Col, Input, Menu, Row} from 'antd';
import {debounce} from '~/helpers/common';
import UploadImage from '~/components/public/UploadImage/UploadImage';
import {uploadImageData} from '~/reduxs/upload/action';
import {useDispatch} from 'react-redux';
const {SubMenu} = Menu;

const BlockLayoutMenu = (props) => {
  const {menu, handleSubmit} = props;
  return (
    <Menu style={{width: 150}} mode="vertical">
      {(menu || []).map((item, index) => (
        <SubMenu
          key={`${item.key}_${index}`}
          icon={item.icon}
          title={`${item.title}`}>
          {(item.children || []).map((childrenItem) =>
            (formTypeOption[childrenItem.formType] || (() => {}))({
              ...childrenItem,
              handleSubmit,
              key: item.key,
            }),
          )}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default BlockLayoutMenu;

const checkBoxLayout = (props) => {
  const {children, handleSubmit, key} = props;
  return (children || []).map((childrenItem, index) => (
    <Menu.Item
      key={`checkbox_${key}_${index}`}
      onClick={() => handleSubmit && handleSubmit(key, childrenItem.value)}
      onMouseOver={() => handleSubmit && handleSubmit(key, childrenItem.value)}>
      {childrenItem.text}
    </Menu.Item>
  ));
};

const subMenuCheckBoxLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value, children} = props;

  const func = debounce((_, valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  }, 500);

  return (
    <SubMenu key={`submenu_${key}_${keyItem}`} title={`${text}`}>
      {checkBoxLayout({children, handleSubmit: func, key: key + keyItem})}
    </SubMenu>
  );
};

const InputLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value} = props;

  const func = debounce((valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  }, 500);

  return (
    <div key={`${keyItem}_`} style={{minWidth: '400px', padding: '5px 16px'}}>
      <Row>
        <Col span={8}>
          <div style={{lineHeight: '2.4em'}}>{text}</div>
        </Col>
        <Col span={16}>
          <Input
            defaultValue={(value || {})[keyItem] || ''}
            onChange={(e) => func(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

const InputTextLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value} = props;

  const func = debounce((valueData) => {
    handleSubmit(key, valueData);
  }, 500);

  return (
    <div key={`${keyItem}_`} style={{minWidth: '400px', padding: '5px 16px'}}>
      <Row>
        <Col span={8}>
          <div style={{lineHeight: '2.4em'}}>{text}</div>
        </Col>
        <Col span={16}>
          <Input defaultValue={value} onChange={(e) => func(e.target.value)} />
        </Col>
      </Row>
    </div>
  );
};

const GroupText = (props) => {
  const {keyItem, text} = props;
  return (
    <div key={`${keyItem}_`} style={{minWidth: '400px', padding: '5px 16px'}}>
      <Row>
        <Col span={24}>
          <div
            style={{lineHeight: '2.4em', fontSize: '14px', fontWeight: 'bold'}}>
            {text}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const ImageForm = (props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    key,
    keyItem,
    text,
    backgroundImage,
    imageUrl,
    value,
  } = props;

  const func = debounce((valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      ...valueData,
    });
  }, 500);

  const onChangeImage = async (fileImage) => {
    if (fileImage) {
      let url = await dispatch(uploadImageData([fileImage]));
      func({imageUrl: url});
    }
  };

  const onRemove = () => {
    func({imageUrl: ''});
  };

  return (
    <div key={`${keyItem}_`} style={{minWidth: '400px', padding: '5px 16px'}}>
      <Row>
        <Col span={8}>
          <div style={{lineHeight: '2.4em'}}>{text}</div>
        </Col>
        <Col span={16}>
          <Input
            defaultValue={backgroundImage || ''}
            onChange={(e) => func({backgroundImage: e.target.value})}
          />
        </Col>
      </Row>
      <Row style={{marginTop: '15px'}}>
        <Col span={8}>
          <div style={{lineHeight: '2.4em'}}>Upload Image </div>
        </Col>
        <Col span={16}>
          <UploadImage
            labelButton="Upload Image"
            imageUrl={imageUrl}
            onChange={(file) => {
              onChangeImage(file);
            }}
            onRemove={onRemove}
          />
        </Col>
      </Row>
    </div>
  );
};

export const formType = {
  CHECKBOX: 'CHECKBOX',
  SUB_CHECKBOX: 'SUB_CHECKBOX',
  INPUT: 'INPUT',
  INPUT_TEXT: 'INPUT_TEXT',
  GROUP_TEXT: 'GROUP_TEXT',
  IMAGE_FORM: 'IMAGE_FORM',
};

export const formTypeOption = {
  [formType.CHECKBOX]: checkBoxLayout,
  [formType.INPUT]: InputLayout,
  [formType.INPUT_TEXT]: InputTextLayout,
  [formType.GROUP_TEXT]: GroupText,
  [formType.IMAGE_FORM]: ImageForm,
  [formType.SUB_CHECKBOX]: subMenuCheckBoxLayout,
};
