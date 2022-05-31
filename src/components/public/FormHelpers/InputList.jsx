import React, {useEffect, useRef, useState} from 'react';
import {Form, Select} from 'antd';
import {trans} from '~/components/public/Translate';
import {FormControl} from '~/components/public/FormHelpers';
import {debounce} from '~/helpers/common';
import {useDispatch} from 'react-redux';
import './style.scss';
import {CheckIcon} from '~/public/assets/icon';
import {isEmpty} from 'lodash';
const {Item} = Form;

const func = debounce((func) => func(), 3000);

export const InputList = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isPut, setIsPut] = useState(false);
  const inputEl = useRef(null);
  const [data, setData] = useState({});
  const [isInput, setIsInput] = useState(props.isInput || true);

  const onClick = () => {
    if (props.onBlur) {
      setIsInput(false);
      setTimeout(() => {
        inputEl.current.focus();
      }, 200);
    }
  };

  const onBlur = () => {
    props.onBlur && setIsInput(true);
  };

  const onPut = () => {
    dispatch(props.func({data: [{...data, value: value}]}));
  };

  const onChange = (e) => {
    setValue(e.target.value);
    props.setValue && props.setValue(e.target.value);
    props.onChange && props.onChange(e);
    setIsPut(true);
  };

  useEffect(() => {
    if (isPut) {
      props.func && func(onPut);
      setIsPut(false);
    }
  }, [value]);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    setIsInput(props.isInput);
  }, [props.isInput]);

  return (
    <div onClick={onClick}>
      {!isInput && (
        <Item name={props.nameItem} rules={[{required: props.rules || false}]}>
          <Select
            mode="tags"
            style={{width: '100%'}}
            placeholder=""
            onBlur={onBlur}
            defaultValue={
              value || ((data.emailList || {}).value || '').split(', ')
            }
            onChange={onChange}
          />
        </Item>
      )}
      {isInput &&
        ((value && <span style={{color: '#4B5B79'}}>{value}</span>) || (
          <span style={{color: '#dcdcdd'}}>
            {trans('Click me to change value')}
          </span>
        ))}
    </div>
  );
};

export const InputListBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <InputList {...props} />
  </FormControl>
);

export const InputListAutoSave = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isPut, setIsPut] = useState(false);
  // const inputEl = useRef(null);
  const [data, setData] = useState({});
  const [isLoad, setIsLoad] = useState(true);
  const [isInput, setIsInput] = useState(props.isInput || true);

  const onClick = () => {
    if (props.onBlur) {
      setIsInput(false);
    }
  };

  const onBlur = () => {
    props.onBlur && setIsInput(true);
    setIsLoad(true);
  };

  const onPut = () => {
    dispatch(props.func({data: [{...data, value: value.join(', ')}]}));
    setIsLoad(false);
  };

  const onChange = (value) => {
    setValue(value);
    setIsPut(true);
    setIsLoad(true);
  };

  useEffect(() => {
    if (isPut) {
      props.func && func(onPut);
      setIsPut(false);
    }
  }, [value]);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    setIsInput(props.isInput);
  }, [props.isInput]);

  return (
    <div onClick={onClick}>
      {!isInput && (
        <div className={'input-loading-row'}>
          <Select
            mode="tags"
            style={{width: '100%'}}
            placeholder=""
            onBlur={onBlur}
            defaultValue={value || ((data || {}).value || '').split(', ')}
            onChange={onChange}
          />
          {isLoad ? (
            <div className={'loader-change'} />
          ) : (
            <CheckIcon style={{marginLeft: '10px'}} color="green" />
          )}
        </div>
      )}
      {isInput &&
        ((!isEmpty((data || {}).value) && (
          <span>{(value || []).join(', ') || (data || {}).value}</span>
        )) || (
          <span style={{color: '#dcdcdd'}}>
            {trans('Click me to change value')}
          </span>
        ))}
    </div>
  );
};

export const InputListAutoSaveBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <InputListAutoSave {...props} />
  </FormControl>
);
