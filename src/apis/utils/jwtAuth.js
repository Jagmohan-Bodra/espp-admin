import moment from 'moment-timezone';
import {TENANT_ID} from '~/config';

export default class JWTAuth {
  setAccessToken(token) {
    return localStorage.setItem('access_token', token);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  checkToken() {
    if (localStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }

  removeToken() {
    return localStorage.removeItem('access_token');
  }

  appendToken(opts = {}) {
    const optHeaders = opts.headers || {};
    return {
      ...opts,
      headers: {
        ...optHeaders,
        timezone: moment.tz.guess(),
        Authorization: `Bearer ${this.getToken()}`,
        tenant: TENANT_ID,
      },
    };
  }

  getFetchFn() {
    return (url, options) => fetch(url, this.appendToken(options));
  }
}
