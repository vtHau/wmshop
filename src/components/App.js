import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from './../store';
import Authentication from './Authentication/Authentication';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Authentication">
          {/* <Stack.Screen name="Main" component={Main} /> */}
          <Stack.Screen name="Authenticaton" component={Authentication} />
          {/* <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
// adb connect 127.0.0.1:21503
