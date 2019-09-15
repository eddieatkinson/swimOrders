import { GET_ALL_SWIMMERS } from '../types';
import axios from 'axios';

export default async function () {
  const url = `${window.apiHost}/getallswimmers`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_ALL_SWIMMERS,
    payload: axiosPromise.data,
  }
}
