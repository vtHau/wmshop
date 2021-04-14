import CallAPI from './../utils/CallAPI';

export const signInRequest = dataLogin => {
  return dispatch => {
    CallAPI('/other/api/login.php', 'POST', {...dataLogin}).then(res => {
      if (typeof res.data !== 'string') {
        dispatch(signIn(res.data));
      }
    });
  };
};

export const signIn = info => {
  return {
    type: 'SIGN_IN',
    payload: info,
  };
};
