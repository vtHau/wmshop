import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchCategory, fetchBrand, fetchProduct} from './../actions/actions';

const HOT = {
  type: 'HOT',
};

const SplashScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const performTimeConsumingTask = async () => {
    await dispatch(fetchCategory());
    await dispatch(fetchBrand());
    await dispatch(fetchProduct(HOT));
    return true;
  };

  useEffect(async () => {
    const result = await performTimeConsumingTask();
    if (result) {
      setTimeout(() => {
        navigation.replace('MAIN');
      }, 2000);
    }
  }, []);

  return (
    <View>
      <Text>hihi</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
