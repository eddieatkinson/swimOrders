import { GET_SWIMMERS } from '../types';
import axios from 'axios';

export default async function (poolId) {
  const url = `${window.apiHost}/getswimmers/${poolId}`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_SWIMMERS,
    payload: axiosPromise.data,
  }
}
