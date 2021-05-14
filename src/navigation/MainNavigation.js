import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {signInToken} from './../actions/actions';
import Header from './../components/Header';
import HomeNavigation from './HomeNavigation';
import CartNavigation from './CartNavigation';
import SearchNavigation from './SearchNavigation';
import Contact from './../screens/Contact';

const Tab = createBottomTabNavigator();

const MainNavigation = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInToken());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          activeTintColor: '#0077FF',
          inactiveTintColor: '#636466',
        }}>
        <Tab.Screen
          name="HOME_NAVIGATION"
          component={HomeNavigation}
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'home'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CART_NAVIGATION"
          component={CartNavigation}
          options={{
            tabBarLabel: 'Giỏ hàng',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'shopping-cart'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SEARCH_NAVIGATION"
          component={SearchNavigation}
          options={{
            tabBarLabel: 'Tìm kiếm',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'search'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CONTACT"
          component={Contact}
          options={{
            tabBarLabel: 'Liên hệ',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'address-book'} size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
