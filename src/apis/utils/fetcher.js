import * as responseProcessors from './responseProcessors';
import JWTAuth from './jwtAuth';

export const jwtAuth = new JWTAuth();
const jwtFetcher = jwtAuth.getFetchFn();

export const defaultFetcher = (url, options) => {
  return jwtFetcher(url, options)
    .then(responseProcessors.logoutOnUnauthorized)
    .then(responseProcessors.toJson)
    .then(responseProcessors.rejectInvalidStatusCode)
    .then(responseProcessors.getJson)
    .then(responseProcessors.checkErr);
};

export const authFetcher = (url, options) => {
  return fetch(url, options)
    .then(responseProcessors.toJson)
    .then(responseProcessors.rejectInvalidStatusCode)
    .then(responseProcessors.getJson)
    .then(responseProcessors.checkErr);
};
