import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from './Header/Header';
import HomeNavigator from './Home/HomeNavigator';
import CartNavigator from './Cart/CartNavigator';
import Search from './Search/Search';
import Contact from './Contact/Contact';
import Setting from './Setting/Setting';

const Tab = createBottomTabNavigator();

const Main = props => {
  const {navigation} = props;

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
          name="HOME_NAVIGATOR"
          component={HomeNavigator}
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'home'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CART_NAVIGATOR"
          component={CartNavigator}
          options={{
            tabBarLabel: 'Giỏ hàng',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'shopping-cart'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SEARCH"
          component={Search}
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

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
