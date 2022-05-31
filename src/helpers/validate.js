import {isArray, isEmpty as isEmptyJs} from 'validate.js';
import validator from 'validator';

export function isEmpty(e) {
  if (isArray(e) && e.length === 0) {
    return true;
  }

  return isEmptyJs(e);
}

export function isObject(e) {
  if (typeof e === 'object' && e !== null) {
    return true;
  }
  return false;
}
export const replaceAll = (str = '', reg, rep) => {
  return str.replace(new RegExp(reg, 'g'), rep);
};

export const isEmail = (v) => validator.isEmail(v);
export const isMultiEmail = (str) => {
  // const newStr = replaceAll(str, ' ','');
  const arr = str.split(',').filter((v) => !isEmail(v.trim()));
  return arr.length === 0;
};
