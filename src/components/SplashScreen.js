import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchCategory, fetchBrand, fetchProduct} from './../actions/actions';
import {
  LineDotsLoader,
  CirclesRotationScaleLoader,
  TextLoader,
} from 'react-native-indicator';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>header</Text>
      </View>
      <View style={styles.body}>
        <CirclesRotationScaleLoader size={80} />
      </View>
      <View style={styles.footer}>
        <LineDotsLoader />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 10,
  },
});
