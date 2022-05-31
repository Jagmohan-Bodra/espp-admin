import React from 'react';
import {Select} from 'antd';
import {GENDER_DATA} from '~/constants/master-data';
import {FormControl} from './FormControl';
import './style.scss';
import {trans} from '../Translate';
const {Option} = Select;

export const SelectDefault = (props) => {
  const {data, value, keyoption, nameoption, disabled} = props;
  if (!props.isInput) {
    return (
      <Select
        size={props.size || 'large'}
        style={props.style || {width: '100%'}}
        placeholder={props.placeholder || 'Please select...'}
        onChange={props.onChange || undefined}
        value={value || ''}
        showSearch
        disabled={disabled}
        optionFilterProp="children"
        filterOption={(input, option) =>
          typeof option.children === 'string' &&
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        <Option value={undefined}>
          <span className="select-option-zero">
            {props.placeholder || 'Please select...'}
          </span>
        </Option>
        {(data || []).map((item, index) => (
          <Option
            key={index}
            value={item[keyoption] || item._id || item.key || index}>
            {item[nameoption] || item.name || item.value || '_'}
          </Option>
        ))}
      </Select>
    );
  }
  return (
    (value && <span>{value}</span>) || (
      <span style={{color: '#4B5B79'}}>{trans('Not Category')}</span>
    )
  );
};

export const SelectObjectValues = (props) => {
  // data: Object
  return (
    <Select
      value={props.value || ''}
      onChange={props.onChange || undefined}
      onBlur={props.onBlur || undefined}
      focus={props.focus || undefined}
      size={props.size || 'large'}
      style={props.style || {width: '100%'}}
      placeholder={props.placeholder || 'Please select...'}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        typeof option.children === 'string' &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
      <Option value="">{props.placeholder || 'Please select...'}</Option>
      {props.data &&
        Object.values(props.data).map((v) => (
          <Option key={v} value={v}>
            {v || '_'}
          </Option>
        ))}
    </Select>
  );
};

export const SelectGender = (props) => {
  const selectValue = props.value || '';
  return (
    <Select
      {...props}
      size={props.size || 'large'}
      style={props.style || {width: '100%'}}
      placeholder={props.placeholder || 'Please select...'}
      onChange={props.onChange || undefined}
      value={selectValue + ''}
      className="select-dropdown-gender">
      <Option value="">{props.placeholder || 'Please select...'}</Option>
      {(GENDER_DATA || []).map((item, index) => (
        <Option key={index} value={item.key || index}>
          {item.value || '_'}
        </Option>
      ))}
    </Select>
  );
};

export const SelectMultiple = (props) => {
  return (
    <Select
      mode="multiple"
      value={props.value || ''}
      onChange={props.onChange || undefined}
      onBlur={props.onBlur || undefined}
      focus={props.focus || undefined}
      size={props.size || 'large'}
      style={props.style || {width: '100%'}}
      placeholder={props.placeholder || 'Please select...'}
      showSearch>
      {(props.data || []).map((item, index) => (
        <Select.Option key={index} value={item._id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export const SelectMultipleBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <SelectMultiple {...props} />
  </FormControl>
);

export const SelectDefaultBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <SelectDefault {...props} />
  </FormControl>
);

export const SelectGenderBlock = (props) => (
  <FormControl {...props} label={props.label}>
    <SelectGender />
  </FormControl>
);
