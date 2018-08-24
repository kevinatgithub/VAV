import axios from 'axios';
import authentication from './auth.manager';
// import config from '../../../config/dev';

/* eslint-disable */
/* TODO: To be checked by Donovan */

const instance = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Array of url's that does not require a bearer token
 */
const unauthorizedUrls = ['app', 'register', 'config.json'];

/**
 * Intercept request and put bearer token in header
 */
instance.interceptors.request.use(config => {
  if (!navigator.onLine) {
    console.log(`You're offline! Unable to send a request`);
    return null;
  }

  if (unauthorizedUrls.includes(config.url)) {
    return Promise.resolve(config);
  }
  return authentication()
    .getToken()
    .then(token => {
      if (!token) {
        throw new Error({ response: 'No valid token found' });
      }
      config.headers.Authorization = `Bearer ${token}`;
      return Promise.resolve(config);
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * When error in response, log error
 */
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, refresh session');
    } else {
      error.response &&
        error.response.data &&
        error.response.data.message &&
        console.error(`Custom mw error message: ${error.response.data.message}`);
    }
    return Promise.reject(error);
  },
);

export default instance;
