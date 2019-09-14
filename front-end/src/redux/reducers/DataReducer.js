import {
  GET_POOLS,
  GET_POOL,
  GET_SWIMMERS,
  GET_SIZE,
  GET_SIZES,
  UPDATE_SIZE_ACTION,
  GET_ITEMS,
  SET_SWIMMER,
  COMPLETE_FORM,
  RESTART_FORM,
  SUBMIT_ORDER,
  GET_GROUP,
  SET_PRICE,
  GET_ORDERS,
  GET_ALL_SWIMMERS,
} from "../types";

const INITIAL_STATE = {
  loading: false,
  pools: [],
  pool: [],
  group: [],
  swimmers: [],
  allSwimmers: [],
  swimmer: {},
  size: [],
  sizes: [],
  items: [],
  orders: [],
  order: {},
  price: '',
  formComplete: false,
  restartForm: false,
  errorMessage: null,
  successMessage: null,
  formSubmitSuccess: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POOLS:
      return {...state, pools: action.payload}
    case GET_POOL:
      return {...state, pool: action.payload}
    case GET_SIZES:
      return {...state, sizes: action.payload}
    case GET_SWIMMERS:
      return {...state, swimmers: action.payload}
    case GET_ALL_SWIMMERS:
      return {...state, allSwimmers: action.payload}
    case GET_SIZE:
      return {...state, size: action.payload}
    case GET_ITEMS:
      return {...state, items: action.payload}
    case SET_SWIMMER:
      return {...state, swimmer: action.payload}
    case GET_GROUP:
      return {...state, group: action.payload}
    case GET_ORDERS:
      return {...state, orders: action.payload}
    case SET_PRICE:
      return {...state, price: action.payload}
    case COMPLETE_FORM:
      return {...state, formComplete: true, order: action.payload}
    case RESTART_FORM:
      return {...state, restartForm: true, formComplete: false}
    case UPDATE_SIZE_ACTION:
      return {...state, successMessage: action.payload}
    case SUBMIT_ORDER:
      return {...state, formSubmitSuccess: action.payload}
    default:
      return state;
  } 
}
