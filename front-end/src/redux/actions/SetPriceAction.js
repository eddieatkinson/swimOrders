import { SET_PRICE } from '../types';

export default function (price) {
  return {
    type: SET_PRICE,
    payload: price,
  }
}