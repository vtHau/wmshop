import {combineReducers} from 'redux';
import authenReducer from './authenReducer';
import cateReducer from './cateReducer';
import brandReducer from './brandReducer';
import productReducer from './productReducer';
import orderHistoryReducer from './orderHistoryReducer';

const rootReducers = combineReducers({
  authenReducer,
  cateReducer,
  brandReducer,
  productReducer,
  orderHistoryReducer,
});

export default rootReducers;
