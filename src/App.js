import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from './store';

import MainNavigation from './navigation/MainNavigation';
import SplashScreen from './screens/SplashScreen';
import MenuNavigation from './navigation/MenuNavigation';

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
          <Stack.Screen name="MAIN_NAVIGATION" component={MainNavigation} />
          <Stack.Screen name="MENU_NAVIGATION" component={MenuNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
// adb connect 127.0.0.1:21503
