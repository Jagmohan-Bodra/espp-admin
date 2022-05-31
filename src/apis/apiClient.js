import querystring from 'querystring';
import Config, {TENANT_ID} from '../config';
import qs from 'qs';
export default class ApiClient {
  constructor(fetcher) {
    this._api_host = Config.API_URL;
    this._fetcher = fetcher;
  }

  get(endpoint, params) {
    const query = params
      ? '?tenant=' + TENANT_ID + '&' + querystring.stringify(params)
      : '';
    return this._fetcher(this._api_host + endpoint + query);
  }

  getQuery(endpoint, params) {
    if (params) {
      Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);
    }
    const query = params
      ? '?tenant=' +
        TENANT_ID +
        '&' +
        qs.stringify(params, {skipNulls: true, skipEmptyStrings: true})
      : '';
    return this._fetcher(this._api_host + endpoint + query);
  }

  getBody(endpoint, data) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant: TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  post(endpoint, data) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant: TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  postFetch(endpoint, data) {
    return this._fetcher(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant: TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant: TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant: TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant: TENANT_ID,
      },
    });
  }

  postUploadFile(endpoint, data) {
    var formData = new FormData();
    formData.append('files', data);
    return this.uploadFile(endpoint, undefined, formData);
  }

  /* istanbul ignore next: it's very hard to test */
  uploadFile(endpoint, params, data, onProgress, headers) {
    const query = params
      ? '?tenant=' + TENANT_ID + '&' + querystring.stringify(params)
      : '';
    const url = this._api_host + endpoint + query;
    return this._fetcher(
      url,
      {
        method: 'POST',
        mode: 'cors',
        headers,
        body: data,
      },
      onProgress,
    );
  }

  /* istanbul ignore next: it's very hard to test */
  downloadFile(endpoint, params, data, onProgress) {
    const query = params ? '?' + querystring.stringify(params) : '';
    const url = this._api_host + endpoint + query;
    return this._fetcher(
      url,
      {
        method: 'GET',
        headers: {
          'Cache-Control': 'no cache',
          tenant: TENANT_ID,
        },
        body: data,
      },
      onProgress,
    );
  }
}
