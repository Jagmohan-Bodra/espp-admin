import React, {useEffect, useRef, useState} from 'react';
import {Form} from 'antd';
import JoditEditor from 'jodit-react';
import {trans} from '~/components/public/Translate';
import {FormControl} from './FormControl';
import {debounce} from '~/helpers/common';
import {useDispatch} from 'react-redux';
import './style.scss';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';
import CkEditor from '../ckeditor';
const {Item} = Form;

const func = debounce((func) => func(), 1500);

const JoditEditorText = (props) => {
  const [value, setValue] = useState('');
  const inputEl = useRef(null);
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

  const onChange = (value) => {
    setValue(value);
    props.setValue && props.setValue(value);
    props.onChange && props.onChange(value);
  };

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setIsInput(props.isInput);
  }, [props.isInput]);

  return (
    <div onClick={onClick}>
      {!isInput && (
        <Item name={props.nameItem} rules={[{required: props.rules || false}]}>
          <JoditEditor
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={inputEl}
          />
        </Item>
      )}
      {isInput &&
        ((value && (
          <span
            style={{color: '#4B5B79'}}
            dangerouslySetInnerHTML={{__html: value}}></span>
        )) || (
          <span style={{color: '#dcdcdd'}}>
            {trans('Click me to change value')}
          </span>
        ))}
    </div>
  );
};

const JoditEditorAutoSave = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isPut, setIsPut] = useState(false);
  const inputEl = useRef(null);
  const [data, setData] = useState({});
  const [isInput, setIsInput] = useState(false);
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

  // const onBlur = () => {
  //   props.onBlur && setIsInput(false);
  //   setTimeout(() => {
  //     setAction(false);
  //   }, 3000);
  // };

  const onPut = () => {
    dispatch(props.func({data: [{...data, value: value}]}));
    setIsChange(true);
  };

  const onChange = (value) => {
    setValue(value);
    props.setValue && props.setValue(value);
    props.onChange && props.onChange(value);
    setIsUpdate(false);
    setIsPut(true);
    setAction(true);
    setIsChange(false);
  };

  useEffect(() => {
    setLoading(props.loading || false);
  }, [props.loading]);

  useEffect(() => {
    setIsUpdate(props.isUpdate || false);
  }, [props.isUpdate]);

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
    <div className={`input-block`} onClick={onClick}>
      <div className={'hover-change-mouse'}>
        {isInput && (
          <div style={{width: '100%'}}>
            <CkEditor
              refs={inputEl}
              value={value}
              onChange={onChange}
              // onBlur={onBlur}
            />
            {/* <JoditEditor
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={inputEl}
            /> */}
          </div>
        )}
        {!isInput &&
          ((value && (
            <>
              <span
                style={{color: '#4B5B79'}}
                dangerouslySetInnerHTML={{__html: value}}></span>
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

export const JoditEditorBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <JoditEditorText {...props} />
  </FormControl>
);

export const JoditEditorAutoSaveBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <JoditEditorAutoSave {...props} />
  </FormControl>
);
