import { RESTART_FORM } from '../types';

export default function () {
  console.log('RESTART_FORM is running!');
  return {
    type: RESTART_FORM,
  }
}