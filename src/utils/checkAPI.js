import CallAPI from './CallAPI';

export const checkSignIn = async signin => {
  const res = await CallAPI('/other/api/login.php', 'POST', {...signin});
  if (typeof res.data === 'object') {
    return 'SIGNIN_SUCCESS';
  }
  return res.data.trim();
};
