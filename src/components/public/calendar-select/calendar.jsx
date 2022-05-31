import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import {DatePicker} from 'antd';
import config from '~/config';
import {ButtonCalendarBlueIcon} from '~/public/assets/icon';

const locale = config.localeDatePicker;
const cssClass = styleGlobal.P_CALENDAR_SELECT_COMPONENT;

const CalendarComponent = (props) => {
  return (
    <div className={`${cssClass}_calendar`}>
      <DatePicker
        locale={locale}
        suffixIcon={<ButtonCalendarBlueIcon />}
        {...props}
      />
    </div>
  );
};

export default CalendarComponent;
