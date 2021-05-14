import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Setting from './../screens/Setting';
import Profile from './../screens/Profile';
import ChangePassword from './../screens/ChangePassword';
import OrderHistory from './../screens/OrderHistory';
import Weather from './../screens/Weather';

const Stack = createStackNavigator();

function SettingNavigation(props) {
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

export default SettingNavigation;
