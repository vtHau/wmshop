import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetail from './../ProductDetail/ProductDetail';
import ProductList from './../ProductList/ProductList';
import Home from './Home';

const Stack = createStackNavigator();

function HomeNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HOME">
      <Stack.Screen name="HOME" component={Home} />
      <Stack.Screen name="PRODUCT_LIST" component={ProductList} />
      <Stack.Screen name="PRODUCT_DETAIL" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
