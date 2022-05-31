import React, {useState, useEffect} from 'react';
import {Modal, Input} from 'antd';
import {ButtonSearchIcon} from '~/public/assets/icon';
import styleGlobal from '~/public/assets/styleGlobal';

const cssClass = styleGlobal.P_SEARCH_BAR_MODAL_COMPONENT;

const SearchComponent = (props) => {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    setValue(value);
  }, [props.value]);

  const onChange = (e) => {
    props.setValue && props.setValue(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Input
      prefix={
        <>
          <ButtonSearchIcon />
          <span className={`${cssClass}__hr`}></span>
        </>
      }
      size={'large'}
      value={value}
      onChange={onChange}
    />
  );
};

const BodyComponent = (props) => {
  const {layoutComponent} = props;
  return <div>{layoutComponent}</div>;
};

const SearchBar = (props) => {
  const [visible, setVisible] = useState(props.visible || false);
  const [layoutComponent, setLayoutComponent] = useState(
    props.layoutComponent || [],
  );
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    setLayoutComponent(props.layoutComponent);
  }, [props.layoutComponent]);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    <Modal
      title={
        <SearchComponent
          value={value}
          setValue={(value) => {
            setValue(value);
            props.setValue && props.setValue(value);
          }}
        />
      }
      closable={false}
      visible={visible}
      onCancel={() => {
        setVisible(false);
        props.setVisible && props.setVisible(false);
      }}
      wrapClassName={`${cssClass}`}
      footer={null}
      width={1000}>
      <BodyComponent layoutComponent={layoutComponent} />
    </Modal>
  );
};

export default SearchBar;
