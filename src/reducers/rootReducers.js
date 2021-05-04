import {combineReducers} from 'redux';
import authenReducer from './authenReducer';
import cateReducer from './cateReducer';
import brandReducer from './brandReducer';
import productReducer from './productReducer';
import orderHistoryReducer from './orderHistoryReducer';
import cartReducer from './cartReducer';
import reviewReducer from './reviewReducer';

const rootReducers = combineReducers({
  authenReducer,
  cateReducer,
  brandReducer,
  productReducer,
  orderHistoryReducer,
  cartReducer,
  reviewReducer,
});

export default rootReducers;
