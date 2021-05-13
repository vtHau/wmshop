import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ConfirmCode from './ConfirmCode/ConfirmCode';

const Stack = createStackNavigator();

function AuthenNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SIGN_IN">
      <Stack.Screen name="SIGN_IN" component={SignIn} />
      <Stack.Screen name="SIGN_UP" component={SignUp} />
      <Stack.Screen name="CONFIRM_CODE" component={ConfirmCode} />
    </Stack.Navigator>
  );
}

export default AuthenNavigator;
