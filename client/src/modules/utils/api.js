import { getCachedConnectContext } from '../utils/connect-context';
import axios from './axios';

/**
 * Handle response in case of successful result
 * @param {Response} response Response object
 */
const handleResponse = response =>
  new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      resolve(response.data);
    } else {
      reject(response.data);
    }
  });

/**
 * Handle exception
 * @param {Response} exception Response object
 */
const handleException = exception =>
  new Promise((resolve, reject) => {
    reject(exception);
  });

/**
 * Execute REST call using the axios library
 * @param {object} params Object with endpoint, method and body
 */
const callApi = ({ endpoint, method = 'GET', body }) => {
  const headers = {
    'connect-context': getCachedConnectContext() || 'C00001',
  };

  const config = {
    headers,
  };

  switch (method.toLowerCase()) {
    case 'get': {
      if (endpoint.endsWith('config.json')) {
        return axios
          .get(endpoint, { url: endpoint, baseURL: '/app/' })
          .then(handleResponse)
          .catch(handleException);
      }
      return axios
        .get(endpoint, config)
        .then(handleResponse)
        .catch(handleException);
    }
    case 'post':
      return axios
        .post(endpoint, body, config)
        .then(handleResponse)
        .catch(handleException);
    case 'put':
      return axios.put(endpoint, body, config);
    case 'delete':
      return axios.delete(endpoint, config);
    default:
      return null;
  }
};

export default callApi;
