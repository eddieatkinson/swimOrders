export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const emailCheck = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/);
export const secretName = 'login';

export const badLogin = 'badLogin';
export const badPassword = 'badPassword';
export const signInSuccess = 'signInSuccess';
