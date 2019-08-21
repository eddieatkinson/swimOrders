import { GET_SIZE } from '../types';
import axios from 'axios';

export default async function (sizeId) {
  console.log('GET_SIZE is running!');
  const url = `${window.apiHost}/getsize/${sizeId}`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_SIZE,
    payload: axiosPromise.data,
  }
}