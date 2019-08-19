import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DataReducer from './DataReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
});

export default rootReducer;
