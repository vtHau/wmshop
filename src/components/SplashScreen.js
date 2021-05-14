import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchCategory, fetchBrand, fetchProduct} from './../actions/actions';
import logo from './../../assets/img/logo/logo.png';
import {DotsLoader} from 'react-native-indicator';

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
      <View style={styles.header}></View>
      <View style={styles.body}>
        <View style={styles.boxLogo}>
          <ImageBackground style={styles.image} source={logo}>
            <Text style={styles.titleLogo}>MW Store</Text>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.footer}>
        <DotsLoader size={14} color={'#8fc8ff'} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5257f2',
  },
  body: {
    marginBottom: '20%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleLogo: {
    color: '#e3e4ff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  boxLogo: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
