import React from 'react';
import qs from 'qs';
import {SortIcon, SortUpIcon, SortDownIcon} from '~/public/assets/icon';
import {META_DATA} from '~/config';
import moment from 'moment';

export const getQueryString = (props) => {
  return props.location.search;
};

export const getQueryBuilder = (query) => {
  return qs.parse(query, {ignoreQueryPrefix: true});
};

export const getSearchUrl = (props) => {
  return qs.parse(props.location.search, {ignoreQueryPrefix: true});
};

export const stringify = (data) => {
  return qs.stringify(data);
};

export const changeUrlQuery = (props, query) => {
  return props.history.replace({search: query});
};

export const getPageFilter = (page, isPageNone) => {
  return {
    meta: {
      pageSize: isPageNone
        ? META_DATA.PAGINATION.PAGE_SIZE_NONE
        : META_DATA.PAGINATION.PAGE_SIZE,
      page: page,
    },
  };
};

export const getSortFilter = (sort) => {
  return {
    meta: {
      sort: sort || [],
    },
  };
};

export const getWeekFilter = (column, date) => {
  return {
    [column]: {
      inWeekOfYear: moment(date).format('YYYY-WW'),
    },
  };
};

export const getInFilter = (column, data) => {
  return {
    [column]: {
      in: data,
    },
  };
};

export const getRegexFilter = (column, data = '') => {
  return {
    [column]: {
      regex: data.replace(/\s+/g, ' ').trim(),
    },
  };
};

export const getEqualFilter = (column, value) => ({
  [column]: {
    equal: value,
  },
});

export const getInDateOfDayFilter = (column, data) => {
  return {
    [column]: {
      inDateOfDay: data,
    },
  };
};

export const getBetweenFilter = (column, data) => {
  if (!data) {
    return {};
  }
  return {
    [column]: {
      lte: data[1],
      gte: data[0],
    },
  };
};

export const getLargerFilter = (column, number) => {
  return {
    [column]: {
      gte: number,
    },
  };
};

export const getObjectIdFilter = (column, id) => {
  return {
    [column]: {
      objectId: id,
    },
  };
};

export const getNinObjectIdFilter = (column, id) => {
  return {
    [column]: {
      ninObjectId: id,
    },
  };
};

export const getArrSortFilter = (sortFilter, column) => {
  const arr = [...sortFilter];
  var index = arr.indexOf(column);
  if (index !== -1) {
    arr[index] = `-${column}`;
    return arr;
  }
  index = arr.indexOf(`-${column}`);
  if (index !== -1) {
    arr.splice(index, 1);
    return arr;
  }
  arr.push(`${column}`);
  return arr;
};

export const SortSwithIcon = ({column, value}) => {
  return !value ? (
    <SortIcon />
  ) : value == column ? (
    <SortUpIcon />
  ) : value == `-${column}` ? (
    <SortDownIcon />
  ) : (
    ''
  );
};

export const findKeySort = (sortFilter, column) => {
  return (
    sortFilter &&
    sortFilter.find((item) => item == column || item == `-${column}`)
  );
};
