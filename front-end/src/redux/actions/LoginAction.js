import { LOGIN_USER } from '../types';
import axios from 'axios';

export default async function (data) {
  const axiosPromise = await axios({
    url: `${window.apiHost}/login`,
    method: 'POST',
    data,
  })
    .catch((error) => {
      alert(error);
    });
  return {
    type: LOGIN_USER,
    payload: axiosPromise.data.msg,
  }
}