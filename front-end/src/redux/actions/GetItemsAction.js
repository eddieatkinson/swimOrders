import { GET_ITEMS } from '../types';
import axios from 'axios';

export default async function () {
  const url = `${window.apiHost}/getitems`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_ITEMS,
    payload: axiosPromise.data,
  }
}
