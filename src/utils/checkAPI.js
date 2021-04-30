import CallAPI from './CallAPI';
import * as Config from './../Config/config';

export const checkSignIn = async signin => {
  const res = await CallAPI(Config.API_SIGNIN, 'POST', {...signin});
  if (typeof res.data === 'object') {
    return res.data;
  }
  return 'SIGIN_FAIL';
};

export const checkSignUp = async signup => {
  const res = await CallAPI('/other/api/signup.php', 'POST', {...signup});
  return res.data.trim();
};
