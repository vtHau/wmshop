import {combineReducers} from 'redux';
import authenReducer from './authenReducer';
import cateReducer from './cateReducer';
import brandReducer from './brandReducer';
import productReducer from './productReducer';
import orderHistoryReducer from './orderHistoryReducer';
import cartReducer from './cartReducer';
import reviewReducer from './reviewReducer';
import searchReducer from './searchReducer';
import weatherReducer from './weatherReducer';
const rootReducers = combineReducers({
  authenReducer,
  cateReducer,
  brandReducer,
  productReducer,
  orderHistoryReducer,
  cartReducer,
  reviewReducer,
  searchReducer,
  weatherReducer,
});

export default rootReducers;
