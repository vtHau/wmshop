import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Login from './Login/Login';

function App() {
  return (
    <View style={{flex: 1}}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
// adb connect 127.0.0.1:21503
