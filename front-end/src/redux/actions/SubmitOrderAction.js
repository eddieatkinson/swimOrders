import { SUBMIT_ORDER } from '../types';
import axios from 'axios';

export default async function (order) {
  const axiosPromise = await axios({
    url: `${window.apiHost}/submitorder`,
    method: 'POST',
    data: order,
  })
    .catch((error) => {
      alert(error);
    });
  return {
    type: SUBMIT_ORDER,
    payload: axiosPromise.data,
  }
}