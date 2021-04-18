import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './../store';

import SignUp from './SignUp/SignUp';

function App() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <SignUp />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
// adb connect 127.0.0.1:21503
