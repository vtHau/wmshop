import CallAPI from './CallAPI';

export const checkSignIn = async signin => {
  const res = await CallAPI('/other/api/signin.php', 'POST', {...signin});
  if (typeof res.data === 'object') {
    return 'SIGNIN_SUCCESS';
  }
  return res.data.trim();
};

export const checkSignUp = async signup => {
  const res = await CallAPI('/other/api/signup.php', 'POST', {...signup});
  return res.data.trim();
};
