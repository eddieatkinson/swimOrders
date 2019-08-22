import { GET_POOLS, GET_SWIMMERS, GET_SIZE, GET_SIZES, UPDATE_SIZE_ACTION } from "../types";

const INITIAL_STATE = {
  loading: false,
  pools: [],
  swimmers: [],
  size: [],
  sizes: [],
  items: [],
  errorMessage: null,
  successMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POOLS:
      return {...state, pools: action.payload}
    case GET_SIZES:
      return {...state, sizes: action.payload}
    case GET_SWIMMERS:
      return {...state, swimmers: action.payload}
    case GET_SIZE:
      return {...state, size: action.payload}
    case UPDATE_SIZE_ACTION:
      return {...state, successMessage: action.payload}
    default:
      return state;
  } 
}
