import { GET_POOLS } from '../types';
import axios from 'axios';

export default async function (data) {
  console.log('GET_POOLS is running!');
  const url = `${window.apiHost}/getpools`;
    const axiosPromise = await axios({
      url,
      method: 'POST',
      data,
    })
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_POOLS,
    payload: axiosPromise,
  }
}
