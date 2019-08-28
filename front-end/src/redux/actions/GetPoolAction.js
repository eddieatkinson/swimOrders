import { GET_POOL } from '../types';
import axios from 'axios';

export default async function (poolId) {
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