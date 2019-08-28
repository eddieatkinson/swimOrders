import { SET_SWIMMER } from '../types';

export default function (swimmer) {
  return {
    type: SET_SWIMMER,
    payload: swimmer,
  }
}