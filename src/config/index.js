const localeDatePicker = {
  lang: {
    locale: 'en_US',
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    today: 'Today',
    now: 'Now',
    backToToday: 'Back to today',
    ok: 'Ok',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    timeSelect: 'Select time',
    dateSelect: 'Select date',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    decadeSelect: 'Choose a decade',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormatDefault: 'MM/DD/YYYY HH:mm:ss',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Previous month (PageUp)',
    nextMonth: 'Next month (PageDown)',
    previousYear: 'Last year (Control + left)',
    nextYear: 'Next year (Control + right)',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    previousCentury: 'Last century',
    nextCentury: 'Next century',
  },
  timePickerLocale: {
    placeholder: 'Select time',
  },
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
  dateTimesFormat: 'DD-MM-YYYY HH:mm',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
};

export const PICKER_FORMAT = {
  showTimeFormat: 'HH:mm',
  dateTimeFormatDefault: 'DD-MM-YYYY HH:mm',
};

export const NO_IMAGE = {
  USER: require('~/public/assets/icon/user.svg'),
  IMAGE: require('~/public/assets/images/no_image.png'),
};

export const TIME_FORMAT = {
  dateFormatDefault: 'DD-MM-YYYY',
  dateTimeFormatDefault: 'DD-MM-YYYY HH:mm',
};

export const DURATION_UNITS = {
  day: 'day',
  week: 'week',
  month: 'month',
};

export const META_DATA = {
  PAGINATION: {
    PAGE_SIZE: 10,
    PAGE_SIZE_NONE: 10000,
  },
};

export const QUERY_PAGE_SIZE_NONE = {
  meta: {
    pageSize: META_DATA.PAGINATION.PAGE_SIZE_NONE,
  },
};

export const BLOCK_UI_CODE = {
  LIST_LINK_FOOTER: 'list_link_footer',
};

export const CALENDAR_TIME_WINDOW = {
  from: 8,
  to: 21,
};

export const ENVIRONMENT_MESSAGE = 'THIS IS TEST ENVIRONMENT';

export const ENVIRONMENT_VARIABLE = {
  DEVELOPMENT: 'dev',
  TESTING: 'test',
  PRODUCTION: 'production',
};

export const TENANT_ID = 0;

export const SITE_ID_DEFAULT = '606ee56854ba246d42742ecb';

export default {
  API_URL: window.config.apiHost,
  localeDatePicker,
};
