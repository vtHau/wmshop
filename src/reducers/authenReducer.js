import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  signIn: false,
  token: '',
  userInfo: {},
};

const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      const {token, userInfo} = action.payload;
      const newState = {
        signIn: true,
        token: token,
        userInfo: userInfo,
      };
      writeStorage('signIn', newState);
      return {
        ...newState,
      };
    }

    case 'SIGN_OUT': {
      const newState = {
        signIn: false,
        token: '',
        userInfo: {},
      };
      removeStorage('signIn');
      return {
        ...newState,
      };
    }

    default:
      return state;
  }
};

export default authenReducer;
