import { COMPLETE_FORM } from '../types';

export default function (order) {
  return {
    type: COMPLETE_FORM,
    payload: order,
  }
}