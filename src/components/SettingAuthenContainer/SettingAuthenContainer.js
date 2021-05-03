import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AuthenNavigator from './../Authentication/AuthenNavigator';
import SettingNavigator from './../Setting/SettingNavigator';

const SettingAuthenContainer = props => {
  const dispatch = useDispatch();
  const signIn = useSelector(state => state.authenReducer.signIn);

  return <>{signIn ? <SettingNavigator /> : <AuthenNavigator />}</>;
};

export default SettingAuthenContainer;
