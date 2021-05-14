import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import SplashScreen from './SplashScreen';
import SettingAuthenContainer from './SettingAuthenContainer/SettingAuthenContainer';
import store from './../store';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SPLASH_SCREEN">
          <Stack.Screen name="SPLASH_SCREEN" component={SplashScreen} />
          <Stack.Screen name="MAIN" component={Main} />
          <Stack.Screen
            name="SETTING_AUTHEN_CONTAINER"
            component={SettingAuthenContainer}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
// adb connect 127.0.0.1:21503
