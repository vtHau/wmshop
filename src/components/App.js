import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Main from './Main';
import store from './../store';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
// adb connect 127.0.0.1:21503
