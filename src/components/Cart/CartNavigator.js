import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Cart from './Cart';
import ProductDetail from '../ProductDetail/ProductDetail';

const Stack = createStackNavigator();

function CartNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CART">
      <Stack.Screen name="CART" component={Cart} />
      <Stack.Screen name="PRODUCT_DETAIL" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default CartNavigator;
