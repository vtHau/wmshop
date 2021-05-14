import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Cart from './../screens/Cart';
import ProductDetail from './../screens/ProductDetail';

const Stack = createStackNavigator();

function CartNavigation() {
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

export default CartNavigation;
