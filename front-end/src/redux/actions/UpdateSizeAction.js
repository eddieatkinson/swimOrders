import { UPDATE_SIZE_ACTION } from '../types';
import axios from 'axios';

export default async function (input) {
  console.log('UPDATE_SIZE_ACTION is running!');
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