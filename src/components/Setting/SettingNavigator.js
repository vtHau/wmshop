import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingContainer from './SettingContainer';
import Profile from './../Profile/Profile';
import ChangePassword from './../ChangePassword/ChangePassword';
import OrderHistory from './../OrderHistory/OrderHistory';
import Weather from './../OtherUtils/Weather';

const Stack = createStackNavigator();

function CartNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SETTING_CONTAINER">
      <Stack.Screen name="SETTING_CONTAINER" component={SettingContainer} />
      <Stack.Screen name="PROFILE" component={Profile} />
      <Stack.Screen name="CHANGE_PASSWORD" component={ChangePassword} />
      <Stack.Screen name="ORDER_HISTORY" component={OrderHistory} />
      <Stack.Screen name="WEATHER" component={Weather} />
    </Stack.Navigator>
  );
}

export default CartNavigator;
