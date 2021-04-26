import {combineReducers} from 'redux';
import authenReducer from './authenReducer';
import cateReducer from './cateReducer';
import brandReducer from './brandReducer';
import productReducer from './productReducer';

const rootReducers = combineReducers({
  authenReducer,
  cateReducer,
  brandReducer,
  productReducer,
});

export default rootReducers;
