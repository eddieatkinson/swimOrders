import { GET_SIZES } from '../types';
import axios from 'axios';

export default async function () {
  console.log('GET_SIZES is running!');
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
