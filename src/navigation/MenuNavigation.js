import React from 'react';
import {useSelector} from 'react-redux';

import AuthenNavigation from './AuthenNavigation';
import SettingNavigation from './SettingNavigation';

const MenuNavigation = () => {
  const signIn = useSelector(state => state.authenReducer.signIn);

  return <>{signIn ? <SettingNavigation /> : <AuthenNavigation />}</>;
};

export default MenuNavigation;
