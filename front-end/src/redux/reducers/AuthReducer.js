import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "../types";

const INITIAL_STATE = {
  loading: false,
  email: '',
  password: '',
  token: '',
  user: null,
  isLoggedIn: false,
  message: '',
  errorMessage: null,
  successMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {...state}
    case LOGIN_USER:
      return {...state, message: action.payload}
    case LOGOUT_USER:
      return {...state, message: action.payload}
    default:
      return state;
  } 
}
