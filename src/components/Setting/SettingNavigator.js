import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Setting from './Setting';
import Profile from './../Profile/Profile';
import ChangePassword from './../ChangePassword/ChangePassword';
import OrderHistory from './../OrderHistory/OrderHistory';
import Weather from './../OtherUtils/Weather';

const Stack = createStackNavigator();

function SettingNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SETTING">
      <Stack.Screen name="SETTING" component={Setting} />
      <Stack.Screen name="PROFILE" component={Profile} />
      <Stack.Screen name="CHANGE_PASSWORD" component={ChangePassword} />
      <Stack.Screen name="ORDER_HISTORY" component={OrderHistory} />
      <Stack.Screen name="WEATHER" component={Weather} />
    </Stack.Navigator>
  );
}

export default SettingNavigator;
