import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isArray} from 'validate.js';

import {dropError} from '~/reduxs/error/action';
import {notification} from 'antd';
import {isObject} from '~/helpers/validate';
const placement = 'topRight';

const ErrorComponent = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const showErr = () => {
    if (error.isErr) {
      openNotification();
      dispatch(dropError());
    }
  };

  useEffect(() => {
    showErr();
  }, [error.isErr]);

  const getMessage = () => {
    var notif = error.message.message;

    if (isArray(notif) && notif.length > 0) {
      var list = '<ul>';
      notif.map((item) => {
        list += `<li><b>${item.arg}</b>: ${item.reason}</li>`;
      });
      list += '</ul>';
      return (
        <span
          style={{color: '#4B5B79'}}
          dangerouslySetInnerHTML={{__html: list}}></span>
      );
    }

    if (isObject(notif) && notif.arg && notif.reason) {
      const mes = `<span><b>${notif.arg}</b>: ${notif.reason}</span>`;
      return (
        <span
          style={{color: '#4B5B79'}}
          dangerouslySetInnerHTML={{__html: mes}}></span>
      );
    }

    return JSON.stringify(notif || '');
  };

  const openNotification = () => {
    notification.warning({
      message: `Warning`,
      description: getMessage(),
      placement,
    });
  };
  return '';
};

export default ErrorComponent;
