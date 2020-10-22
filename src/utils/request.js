import axios from 'axios';

const hostAPI = `${window.location.origin}`;

export const request = async ({
  prefix,
  url = '',
  method = 'get',
  params,
  data,
  headers = {},
  ...props
}) => {
  try {
    const result = await axios({
      url: `${hostAPI}${prefix || request.prefix || ''}${url}`,
      method,
      data,
      params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      ...props,
    });
    return result;
  } catch (err) {
    const { response } = err;
    if (response && response.status === 403) {
      window.localStorage.clear();
      window.location.href = '/#/login';
    }
    throw err;
  }
};
