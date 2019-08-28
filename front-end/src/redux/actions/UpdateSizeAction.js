import { UPDATE_SIZE_ACTION } from '../types';
import axios from 'axios';

export default async function (input) {
  const axiosPromise = await axios({
    url: `${window.apiHost}/updatesize`,
    method: 'POST',
    data: input,
  })
    .catch((error) => {
      alert(error);
    });
  return {
    type: UPDATE_SIZE_ACTION,
    payload: axiosPromise.data,
  }
}