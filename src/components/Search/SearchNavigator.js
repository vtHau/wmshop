import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Search from './Search';
import ProductDetail from '../ProductDetail/ProductDetail';

const Stack = createStackNavigator();

function SearchNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SEARCH">
      <Stack.Screen name="SEARCH" component={Search} />
      <Stack.Screen name="PRODUCT_DETAIL" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default SearchNavigator;
