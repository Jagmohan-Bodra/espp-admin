import React, {useState, useEffect} from 'react';
import {Form, Input, DatePicker} from 'antd';
import moment from 'moment';
import {
  SelectGender,
  SelectDefault,
} from '~/components/public/FormHelpers/SelectBlock';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';

const {Item} = Form;
const cssClass = 'form-control-row';

export const RowLabelStatus = (props) => {
  const {
    label,
    children,
    name,
    nameActive,
    nameUnActive,
    desktopLabel,
    desktopForm,
  } = props;

  return (
    <RowAuto className={`${cssClass} row-label-status`}>
      {label && (
        <ColAuto desktop={desktopLabel || 9} tablet={24}>
          <label className={`${cssClass}_label`}>{label}</label>
        </ColAuto>
      )}
      <ColAuto desktop={desktopForm || 15} tablet={20}>
        <div className="box-icon-check-status">
          {children}
          {name && name == nameActive && (
            <CheckIcon color="green" className="ml-10" />
          )}
          {name && name == nameUnActive && <TimesIcon color="red" />}
        </div>
      </ColAuto>
    </RowAuto>
  );
};

export const FormGroupLabel = ({label, form}) => {
  const cssClass = 'form-control-row';
  return (
    <RowAuto>
      <ColAuto desktop={6} tablet={24}>
        <label className={`${cssClass}_label`}>{label}</label>
      </ColAuto>
      <ColAuto desktop={15} tablet={24}>
        {form}
      </ColAuto>
    </RowAuto>
  );
};

export const FormItem = (props) => {
  const cssClass = 'form-control-row';
  const {label, children, rules, text, clickToEdit, valueText} = props;
  const [isText, setIsText] = useState(props.isText);

  useEffect(() => {
    setIsText(props.isText);
  }, [props.isText]);

  const onClick = () => {
    clickToEdit && setIsText(false);
  };

  const handleFormText = () => {
    if (!isText) {
      return (
        <Item name={label} rules={rules}>
          {children}
        </Item>
      );
    }
    return valueText ? valueText : text;
  };

  return (
    <RowAuto>
      <ColAuto desktop={7} tablet={24}>
        <label className={`${cssClass}_label`}>{label}</label>
      </ColAuto>
      <ColAuto desktop={14} tablet={24}>
        <div className={`${cssClass}_text`} onClick={onClick}>
          {handleFormText()}
        </div>
      </ColAuto>
    </RowAuto>
  );
};

export const InputFormItem = (props) => {
  const {label, onChange, rules, value, isText, disabled} = props;
  return (
    <FormItem isText={isText} label={label} rules={rules} text={value}>
      <Input value={value} onChange={onChange} disabled={disabled} />
    </FormItem>
  );
};

export const AreaFormItem = (props) => {
  const {label, onChange, rules, value, isText, disabled} = props;
  return (
    <FormItem isText={isText} label={label} rules={rules} text={value}>
      <Input.TextArea value={value} onChange={onChange} disabled={disabled} />
    </FormItem>
  );
};

export const DatePickerItem = (props) => {
  const {label, onChange, rules, value, isText, style, valueText} = props;
  return (
    <FormItem
      isText={isText}
      label={label}
      rules={rules}
      text={value}
      valueText={valueText}>
      <DatePicker
        onChange={onChange}
        format={'YYYY-MM-DD'}
        value={value ? moment(value) : ''}
        allowClear={false}
        style={style || {width: '100%'}}
      />
    </FormItem>
  );
};

export const SelectGenderItem = (props) => {
  const {label, onChange, rules, value, isText, valueText} = props;
  return (
    <FormItem
      isText={isText}
      label={label}
      rules={rules}
      text={value}
      valueText={valueText}>
      <SelectGender value={value} onChange={onChange} />
    </FormItem>
  );
};

export const SelectDefaultItem = (props) => {
  const {
    label,
    data,
    onChange,
    rules,
    value,
    isText,
    valueText,
    disabled,
    keyoption,
    nameoption,
  } = props;
  return (
    <FormItem label={label} rules={rules} isText={isText} text={valueText}>
      <SelectDefault
        data={data}
        value={value}
        onChange={onChange}
        disabled={disabled}
        keyoption={keyoption}
        nameoption={nameoption}
      />
    </FormItem>
  );
};
