import CallAPI from './CallAPI';
import * as Config from './../Config/config';

export const checkSignIn = async signin => {
  const res = await CallAPI(Config.API_SIGNIN, 'POST', {...signin});
  if (typeof res.data === 'object') {
    return res.data;
  }
  return 'SIGIN_FAIL';
};

export const updatePassword = async infoPassword => {
  const res = await CallAPI(Config.API_UPDATE_PASSWORD, 'POST', {
    ...infoPassword,
  });
  return res.data.trim();
};

export const updateInfo = async userInfo => {
  const res = await CallAPI(Config.API_UPDATE_INFO, 'POST', {...userInfo});
  return res.data.trim();
};

export const checkSignUp = async signup => {
  const res = await CallAPI('/other/api/signup.php', 'POST', {...signup});
  return res.data.trim();
};
