import { GET_GROUP } from '../types';
import axios from 'axios';

export default async function (groupId) {
  const url = `${window.apiHost}/getgroup/${groupId}`;
  const axiosPromise = await axios.get(url)
    .catch((error) => {
      alert(error);
    });
  return {
    type: GET_GROUP,
    payload: axiosPromise.data,
  }
}