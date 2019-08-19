import { GET_POOLS } from '../types';
import axios from 'axios';

export default async function () {
  console.log('GET_POOLS is running!');
  const url = `${window.apiHost}/getpools`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_POOLS,
    payload: axiosPromise.data,
  }
}
