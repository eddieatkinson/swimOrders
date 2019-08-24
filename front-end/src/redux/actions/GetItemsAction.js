import { GET_ITEMS } from '../types';
import axios from 'axios';

export default async function () {
  console.log('GET_ITEMS is running!');
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
