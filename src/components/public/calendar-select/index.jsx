import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import {DatePicker} from 'antd';
import config from '~/config';
import {ButtonCalendarBlueIcon} from '~/public/assets/icon';
import moment from 'moment';

const locale = config.localeDatePicker;
const cssClass = styleGlobal.P_CALENDAR_SELECT_COMPONENT;

const CalendarSelect = (props) => {
  const {value, setValue} = props;

  const onChange = (date) => {
    setValue(moment(date).startOf('isoWeek'));
  };

  return (
    <div className={`${cssClass}`}>
      <DatePicker
        onChange={onChange}
        picker="week"
        locale={locale}
        suffixIcon={<ButtonCalendarBlueIcon />}
        format={
          '[W]' +
          moment(value).format('W ([DD]/[MM] -') +
          ' ' +
          moment(value).add(6, 'days').format('DD/MM') +
          ')'
        }
        value={value}
      />
    </div>
  );
};

export default CalendarSelect;
