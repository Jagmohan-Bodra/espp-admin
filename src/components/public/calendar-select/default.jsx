import React from 'react';
import moment from 'moment';
import styleGlobal from '~/public/assets/styleGlobal';
import {DatePicker} from 'antd';
import config from '~/config';
import {ButtonCalendarBlueIcon} from '~/public/assets/icon';

const locale = config.localeDatePicker;
const cssClass = styleGlobal.P_CALENDAR_SELECT_COMPONENT;

const {RangePicker} = DatePicker;

const CalendarDefault = (props) => {
  return (
    <div className={`${cssClass}`}>
      <RangePicker
        {...props}
        locale={locale}
        suffixIcon={<ButtonCalendarBlueIcon />}
        ranges={{
          Today: [moment(), moment()],
          'This month': [moment().startOf('month'), moment().endOf('month')],
        }}
      />
    </div>
  );
};

export default CalendarDefault;
