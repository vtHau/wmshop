import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  signIn: false,
  token: null,
  userInfo: {},
};

const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      const {token, userInfo} = action.payload;
      state.signIn = true;
      state.token = token;
      state.userInfo = userInfo;

      writeStorage('signIn', state);

      return {
        ...state,
      };
    }

    case 'SIGN_OUT': {
      state.signIn = false;
      state.token = null;
      state.userInfo = {};

      writeStorage('signIn', state);

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default authenReducer;
