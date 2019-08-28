import { GET_SIZES } from '../types';
import axios from 'axios';

export default async function () {
  const url = `${window.apiHost}/getsizes`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_SIZES,
    payload: axiosPromise.data,
  }
}
