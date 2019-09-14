import { GET_ORDERS } from '../types';
import axios from 'axios';

export default async function () {
  const url = `${window.apiHost}/getorders`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_ORDERS,
    payload: axiosPromise.data,
  }
}
