import React, {useEffect, useState} from 'react';
import {Checkbox, Row, Col} from 'antd';
import {FormControl} from './FormControl';
import './style.scss';

const CheckBoxList = (props) => {
  // const [value, setValue] = useState([]);
  const [isDisabled, setIsDisabled] = useState(props.isDisabled || false);

  // const onChange = () => {
  //     setValue(value)
  //     props.onChange && props.onChange(value)
  // }

  // useEffect(() => {
  //     setValue(props.value || "")
  // }, [props.value])

  useEffect(() => {
    setIsDisabled(props.isDisabled);
  }, [props.isDisabled]);

  return (
    <>
      <div className={'check-box-list'}>
        <Checkbox.Group
          style={{
            width: props.width || '100%',
            height: props.height || '100px',
            overflow: 'scroll',
          }}
          className={'check-box-list-form'}
          onChange={props.onChange}
          disabled={isDisabled}
          defaultValue={(props.value || []).map((item) => item._id) || []}>
          <Row>
            {(props.data || []).map((item) => (
              <Col key={item._id} span={24}>
                <Checkbox value={item._id}>{item.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    </>
  );
};

export const CheckBoxListBlock = (props) => (
  <FormControl {...props} label={props.label} labelTop={props.labelTop}>
    <CheckBoxList
      onChange={props.onChange}
      value={props.value}
      data={props.data}
      width={props.width}
      height={props.height}
      isDisabled={props.isDisabled}
    />
  </FormControl>
);
