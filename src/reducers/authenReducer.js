import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  sigin: false,
  token: null,
  userInfo: {},
};

const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      const {token, userInfo} = action.payload;
      state.sigin = true;
      state.token = token;
      state.userInfo = userInfo;

      return {
        ...state,
      };
    }

    case 'SIGN_OUT': {
      state.sigin = false;
      state.token = null;
      state.userInfo = {};
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default authenReducer;
