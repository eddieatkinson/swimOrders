import { COMPLETE_FORM } from '../types';

export default function (order) {
  console.log('COMPLETE_FORM is running!');
  return {
    type: COMPLETE_FORM,
    payload: order,
  }
}