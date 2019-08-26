import { SET_PRICE } from '../types';

export default function (price) {
  console.log('SET_PRICE is running!');
  return {
    type: SET_PRICE,
    payload: price,
  }
}