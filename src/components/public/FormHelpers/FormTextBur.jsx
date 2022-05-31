import React, {useState, useEffect, useRef} from 'react';
import {Input, Select, TreeSelect} from 'antd';
import JoditEditor from 'jodit-react';
import {isEmpty} from '~/helpers/validate';
const {TextArea} = Input;
const {Option} = Select;
const {SHOW_PARENT} = TreeSelect;
import './style.scss';

export const InputAreaBur = (props) => {
  const [isForm, setIsForm] = useState(props.onlyForm || false);
  const [value, setValue] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setIsForm(props.onlyForm);
  }, [props.onlyForm]);

  const onClick = () => {
    setIsForm(true);
    setTimeout(() => {
      inputEl.current.focus();
    }, 200);
  };

  const onBlur = () => {
    if (!props.onlyForm) {
      setIsForm(false);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    props.setValue && props.setValue(e.target.value);
  };

  const getForm = () => {
    if (props.isTextArea) {
      return (
        <TextArea
          rows={props.rows || 4}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputEl}
        />
      );
    }
    return (
      <Input value={value} onChange={onChange} onBlur={onBlur} ref={inputEl} />
    );
  };

  return (
    <div style={{width: '85%', marginLeft: '10px'}} onClick={onClick}>
      {isForm && getForm()}
      {!isForm &&
        ((value && (
          <span style={{color: '#4B5B79'}} className={`ellipsis-text`}>
            {value}
          </span>
        )) || (
          <span style={{color: 'rgb(158 158 158 / 56%)'}}>
            {'Click to edit'}
          </span>
        ))}
    </div>
  );
};

export const JoditEditorBur = (props) => {
  const [isForm, setIsForm] = useState(props.onlyForm || false);
  const [value, setValue] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setIsForm(props.onlyForm);
  }, [props.onlyForm]);

  const onClick = () => {
    setIsForm(true);
    setTimeout(() => {
      inputEl.current.focus();
    }, 200);
  };

  const onBlur = () => {
    if (!props.onlyForm) {
      setIsForm(false);
    }
  };

  const onChange = (val) => {
    setValue(val);
    props.setValue && props.setValue(val);
  };

  return (
    <div style={{width: '85%'}} onClick={onClick}>
      {isForm && (
        <JoditEditor
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputEl}
        />
      )}
      {!isForm &&
        ((value && (
          <span
            style={{color: '#4B5B79'}}
            dangerouslySetInnerHTML={{__html: value}}></span>
        )) || (
          <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
            {'Click to edit'}
          </span>
        ))}
    </div>
  );
};

// SelectTextBur
export const SelectTextBur = (props) => {
  const [isForm, setIsForm] = useState(props.onlyForm || false);
  const [data, setData] = useState(props.data || []);
  const [val, setVal] = useState(props.value || '');
  const eRef = useRef(null);

  useEffect(() => {
    setVal(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setData(props.data || []);
  }, [props.data]);

  useEffect(() => {
    setIsForm(props.onlyForm);
  }, [props.onlyForm]);

  const onClick = () => {
    setIsForm(true);
    setTimeout(() => {
      eRef.current && eRef.current.focus();
    }, 200);
  };

  const onBlur = () => {
    if (!props.onlyForm) {
      setIsForm(false);
    }
  };

  const onChangeValue = (value) => {
    setVal(value);
    props.setValue && props.setValue(value);
  };

  const getOptions = () => {
    const {object, keyOption, valueOption} = props;
    if (!isEmpty(data)) {
      return data.map((item, index) => (
        <Option
          key={index}
          value={item._id || item.key || item[keyOption] || index}>
          {item.name || item.value || item[valueOption] || null}
        </Option>
      ));
    }

    if (!isEmpty(object)) {
      const list = Object.values(object);
      return list.map((v) => (
        <Option key={v} value={v}>
          {v || '_'}
        </Option>
      ));
    }
  };

  return (
    <div className="wrap-select-bur" onClick={onClick}>
      {isForm && (
        <Select
          value={val}
          onChange={onChangeValue}
          onBlur={onBlur}
          ref={eRef}
          size={props.size || 'large'}
          style={props.style || {width: '100%', marginLeft: '10px'}}
          placeholder={props.placeholder || 'Please select...'}
          className={props.className}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {props.hidePlaceholder || (
            <Option value="">{props.placeholder || 'Please select...'}</Option>
          )}
          {getOptions()}
        </Select>
      )}
      {!isForm &&
        ((!isEmpty(val) &&
          (data || []).map(
            (item, index) =>
              (item.key === val || item._id === val) && (
                <span
                  key={index}
                  style={{color: '#4B5B79', paddingLeft: '10px'}}>
                  {item.name || val}
                </span>
              ),
          )) || (
          <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
            {'Click to edit'}
          </span>
        ))}
    </div>
  );
};

// SelectBur
export const SelectBur = (props) => {
  const [isForm, setIsForm] = useState(props.onlyForm || false);
  const [val, setVal] = useState(props.value || '');
  const eRef = useRef(null);

  useEffect(() => {
    setVal(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setIsForm(props.onlyForm);
  }, [props.onlyForm]);

  const onClick = () => {
    setIsForm(true);
    setTimeout(() => {
      eRef.current && eRef.current.focus();
    }, 200);
  };

  const onBlur = () => {
    if (!props.onlyForm) {
      setIsForm(false);
    }
  };

  const onChangeValue = (value) => {
    setVal(value);
    props.setValue && props.setValue(value);
  };

  return (
    <div className="wrap-select-bur" onClick={onClick}>
      {isForm && (
        <Select
          value={val}
          onChange={onChangeValue}
          onBlur={onBlur}
          ref={eRef}
          size={props.size || 'large'}
          style={props.style || {width: '100%', marginLeft: '10px'}}
          placeholder={props.placeholder || 'Please select...'}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          <Option value="">{props.placeholder || 'Please select...'}</Option>
          {(props.data || []).map((item, index) => (
            <Option key={index} value={item.key}>
              {item.name}
            </Option>
          ))}
        </Select>
      )}
      {!isForm &&
        ((
          <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
            {((props.data || []).find((item) => item.key == val) || {}).name ||
              val}
          </span>
        ) || (
          <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
            {'Click to edit'}
          </span>
        ))}
    </div>
  );
};

export const TreeSelectBur = (props) => {
  const [isForm, setIsForm] = useState(props.onlyForm || false);
  const [val, setVal] = useState(props.value || '');
  const eRef = useRef(null);
  const {treeData} = props;

  useEffect(() => {
    setVal(props.value || '');
  }, [props.value]);

  useEffect(() => {
    setIsForm(props.onlyForm);
  }, [props.onlyForm]);

  const onClick = () => {
    setIsForm(true);
    setTimeout(() => {
      eRef.current && eRef.current.focus();
    }, 200);
  };

  const onBlur = () => {
    if (!props.onlyForm) {
      setIsForm(false);
    }
  };

  const onChangeValue = (value) => {
    setVal(value);
    props.setValue && props.setValue(value);
  };

  return (
    <div className="wrap-select-bur" onClick={onClick}>
      {isForm && (
        <TreeSelect
          onBlur={onBlur}
          treeData={treeData || []}
          value={val}
          onChange={onChangeValue}
          treeCheckable={true}
          showCheckedStrategy={SHOW_PARENT}
          style={props.style || {width: '100%', marginLeft: '10px'}}
          placeholder={props.placeholder || 'Please select...'}
        />
      )}
      {!isForm &&
        ((
          <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
            {((props.data || []).find((item) => item.key == val) || {}).name ||
              (val || [])
                .map(
                  (item) =>
                    (
                      (props.data || []).find(
                        (dataItem) => dataItem._id == item,
                      ) || {}
                    ).name,
                )
                .join(', ') ||
              val}
          </span>
        ) || (
          <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
            {'Click to edit'}
          </span>
        ))}
    </div>
  );
};
