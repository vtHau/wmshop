import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './../screens/Home';
import ProductList from './../screens/ProductList';
import ProductDetail from './../screens/ProductDetail';

const Stack = createStackNavigator();

function HomeNavigation() {
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

export default HomeNavigation;
