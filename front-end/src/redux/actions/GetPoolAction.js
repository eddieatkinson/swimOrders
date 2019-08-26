import { GET_POOL } from '../types';
import axios from 'axios';

export default async function (poolId) {
  console.log('GET_POOL is running!');
  const url = `${window.apiHost}/getpool/${poolId}`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_POOL,
    payload: axiosPromise.data,
  }
}