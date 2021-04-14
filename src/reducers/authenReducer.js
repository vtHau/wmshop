// import writeStorage from './../utils/writeStorage';
// import removeStorage from './../utils/removeStorage';

const initialState = {
  login: false,
  token: '',
  userInfo: [],
};

const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      const {token, userInfo} = action.payload;
      state.login = true;
      state.token = token;
      state.userInfo = userInfo;

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default authenReducer;
