import { SUBMIT_ORDER } from '../types';
import axios from 'axios';

export default async function (senderInfo, order) {
  console.log('SUBMIT_ORDER is running!');
  const axiosPromise = await axios({
    url: `${window.apiHost}/submitorder`,
    method: 'POST',
    data: {senderInfo, order},
  })
    .catch((error) => {
      alert(error);
    });
  return {
    type: SUBMIT_ORDER,
    payload: axiosPromise.data,
  }
}