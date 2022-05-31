import React, {useEffect, useRef, useState} from 'react';
import {Input, Form} from 'antd';
import {trans} from '~/components/public/Translate';
import {FormControl} from '~/components/public/FormHelpers';
import {debounce} from '~/helpers/common';
import {useDispatch} from 'react-redux';
import './style.scss';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';
const {Item} = Form;

const func = debounce((func) => func(), 1500);

export const InputText = (props) => {
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
          <Input
            placeholder={props.placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={inputEl}
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

export const InputBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <InputText {...props} />
  </FormControl>
);

export const InputItemSave = (props) => {
  return (
    <FormControl {...props} label={props.label}>
      <Item name={props.label} rules={[{required: true}]}>
        <InputText {...props} />
      </Item>
    </FormControl>
  );
};

export const InputAutoSave = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isPut, setIsPut] = useState(false);
  const inputEl = useRef(null);
  const [data, setData] = useState({});
  const [isInput, setIsInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [action, setAction] = useState(false);
  const [isChange, setIsChange] = useState(true);

  const onClick = () => {
    if (props.onBlur) {
      setIsInput(true);
      setTimeout(() => {
        inputEl.current.focus();
      }, 200);
    }
  };

  const onBlur = () => {
    props.onBlur && setIsInput(false);
    setTimeout(() => {
      setAction(false);
    }, 3000);
  };

  const onPut = () => {
    dispatch(props.func({data: [{...data, value: value}]}));
    setIsChange(true);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    props.setValue && props.setValue(e.target.value);
    props.onChange && props.onChange(e);
    setIsUpdate(false);
    setIsPut(true);
    setAction(true);
    setIsChange(false);
  };

  useEffect(() => {
    if (isPut) {
      props.func && func(onPut);
      setIsPut(false);
    }
  }, [value]);

  useEffect(() => {
    setLoading(props.loading || false);
  }, [props.loading]);

  useEffect(() => {
    setIsUpdate(props.isUpdate || false);
  }, [props.isUpdate]);

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
    <div className={`input-block`} onClick={onClick}>
      <div className={'hover-change-mouse'}>
        {isInput && (
          <Input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={inputEl}
            type={props.type || 'text'}
          />
        )}
        {!isInput &&
          ((value && (
            <>
              <span style={{color: '#4B5B79'}}>{value}</span>
              <span className={`tooltiptext`}>Click to Edit</span>
            </>
          )) || (
            <span style={{color: '#dcdcdd'}}>
              {trans('Click me to change value')}
            </span>
          ))}
      </div>
      <div>
        {action && loading && isChange ? (
          <div className={'loader-change'} />
        ) : action && isUpdate && isChange ? (
          <CheckIcon style={{marginLeft: '10px'}} color="green" />
        ) : (
          <TimesIcon style={{marginLeft: '14px'}} color="transparent" />
        )}
      </div>
    </div>
  );
};

export const InputAutoSaveBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <InputAutoSave {...props} />
  </FormControl>
);
