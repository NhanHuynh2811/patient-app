import axios from 'axios';
// import { toast } from 'react-toastify';

const defaultHost = 'http://house.famicaredev.online';

export const makeRequest = async ({
  url = '',
  method = 'get',
  data,
  headers = {},
  params,
  dispatch,
  type = {},
}) => {
  dispatch({ type: type.PENDING });
  return Promise.all([])
    .then(values => axios({
        url: `${values[0] || defaultHost}${url}`,
        method,
        data,
        params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials: 'same-origin',
        typeAction: type,
        dispatchAction: dispatch,
      }))
    .finally(() => {
      dispatch({ type: type.UNPENDING });
    });
};

export const getHeaderAuthorization = () => ({
  Authorization: 'Bearer ',
});
