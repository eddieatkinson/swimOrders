import { SET_SWIMMER } from '../types';

export default function (swimmer) {
  console.log('SET_SWIMMER is running!');
  return {
    type: SET_SWIMMER,
    payload: swimmer,
  }
}