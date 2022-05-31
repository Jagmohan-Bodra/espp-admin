import Config from '../config';
import endPoint from '../apis/endPoint';
import {useSelector} from 'react-redux';
import {isEmpty} from 'validate.js';
import config from '../config';

export function createIdMapping(list, property) {
  if (!property) {
    // create mapping from id to every element in list
    return list.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }
  return list.reduce((acc, item) => {
    acc[item.id] = item[property];
    return acc;
  }, {});
}

export function createId2Mapping(list, property) {
  if (!property) {
    // create mapping from _id to every element in list
    return list.reduce((acc, item) => {
      acc[item._id] = item;
      return acc;
    }, {});
  }
  return list.reduce((acc, item) => {
    acc[item._id] = item[property];
    return acc;
  }, {});
}

export function countLine(str) {
  return str.split('\n').filter((line) => line.length > 0).length;
}

export function numberThousandSeparator(num, separator = ',') {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function convertCamelCaseToCapitalize(input) {
  const capitalize = ([first, ...rest]) =>
    first.toUpperCase() + rest.join('').toLowerCase();

  return input
    .split(/(?=[A-Z])/)
    .map((v) => capitalize(v))
    .join(' ');
}

export function textTruncate(str, length, ending) {
  if (typeof length === 'undefined') {
    length = 100;
  }
  if (typeof ending === 'undefined') {
    ending = '...';
  }

  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }

  return str;
}

export const rulesConfirmPassword = (labelPassword) => [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({getFieldValue}) => ({
    validator(rule, value) {
      if (!value || getFieldValue(labelPassword) === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords that you entered do not match!');
    },
  }),
];

export function userInfoHandle(me) {
  return Object(me.data) || {};
}

export function userGroupHandle(me) {
  return Object(me.data).userGroup || {};
}

export const urlDownload = (idFile) =>
  `${Config.API_URL + endPoint.DOWNLOAD_FILE(idFile)}`;

export const fileObjectDone = (uid, name, url = '#') => {
  return {
    uid: `-${uid}`,
    name: name,
    status: 'done',
    url: url,
  };
};

export const checkLinkUpload = (link = '#') => {
  if (link.includes('http')) {
    return link;
  }
  return Config.LOGOUT_URL + link;
};

export const objToArrayValues = (obj) => {
  if (obj) {
    var list = [];
    Object.values(obj).map((v) => (list[v] = v));
    return list;
  }
  return [];
};

export const isString = (str) =>
  typeof str === 'string' || str instanceof String;

export const isAccess = (permisstionKeys) => {
  const me = useSelector((state) => state.me.data);
  const {roles} = ((me || {}).data || {}).userGroup || {};
  if (isString(permisstionKeys)) {
    return (roles || []).indexOf(permisstionKeys) != -1;
  }
  if (Array.isArray(permisstionKeys)) {
    let isAccessPermission = false;
    permisstionKeys.forEach((key) => {
      if ((roles || []).indexOf(key) != -1) {
        isAccessPermission = true;
      }
    });
    return isAccessPermission;
  }
  return false;
};

export const getFullPath = (path) =>
  !isEmpty(path) && `${config.API_URL}${path}`;
