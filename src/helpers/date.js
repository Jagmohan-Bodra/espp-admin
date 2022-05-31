import moment from 'moment';
import Config from '../config';
const {localeDatePicker} = Config;

export function formatDateFilter(date) {
  return moment(date).format(`YYYY-MM-DD`);
}

export function formatDateFull(date) {
  return moment(date).format('DD MMM YYYY');
}

export const getThisMonth = () => {
  return moment().format('YYYY-MM');
};

export function formatDateDefault(date) {
  return moment(date).format(localeDatePicker.dateFormat);
}

export function formatDateTimeDefault(date) {
  return moment(date).format(localeDatePicker.dateTimeFormat);
}

export function formatDate(date) {
  return moment(date).format(localeDatePicker.dateFormat);
}

export function formatDateTime(date) {
  return moment(date).format(localeDatePicker.lang.dateTimeFormat);
}

export function formatTimeDefault(date) {
  return moment(date).format('LT');
}

export function today() {
  return moment();
}

export function formatDateMonth(date) {
  return moment(date).format('DD MMM YYYY');
}

export function millisecondsBetweenDate(dateFrom, dateTo) {
  return moment(dateTo).diff(moment(dateFrom));
}
