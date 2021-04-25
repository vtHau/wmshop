import {combineReducers} from 'redux';
import authenReducer from './authenReducer';
import cateReducer from './cateReducer';
import brandReducer from './brandReducer';

const rootReducers = combineReducers({
  authenReducer,
  cateReducer,
  brandReducer,
});

export default rootReducers;
