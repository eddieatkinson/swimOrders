import { LOGOUT_USER } from '../types';

export default async function () {
  return {
    type: LOGOUT_USER,
    payload: 'signoutSuccess',
  }
}