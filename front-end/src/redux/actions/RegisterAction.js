import { REGISTER_USER } from '../types';
import axios from 'axios';

export default async function (userInfo) {
  console.log(userInfo);
  const axiosPromise = await axios({
    url: `${window.apiHost}/registeruser`,
    method: 'POST',
    data: userInfo,
  })
    .catch((error) => {
      alert(error);
    });
  return {
    type: REGISTER_USER,
    payload: axiosPromise.data,
  }
}
