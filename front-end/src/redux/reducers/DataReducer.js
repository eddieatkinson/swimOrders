import { GET_POOLS, GET_SWIMMERS, GET_SIZE } from "../types";

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
    case GET_SWIMMERS:
      return {...state, swimmers: action.payload}
    case GET_SIZE:
      return {...state, size: action.payload}
    default:
      return state;
  } 
}
