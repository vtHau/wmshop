import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Cart from './Cart/Cart';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Header from './Header/Header';
import ProductDetail from './ProductDetail/ProductDetail';
import ChangePassword from './ChangePassword/ChangePassword';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            activeTintColor: '#0077FF',
            inactiveTintColor: '#636466',
          }}>
             {/* <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Tìm kiếm',
              tabBarIcon: ({color}) => (
                <FontAwesome5 name={'search'} size={20} color={color} />
              ),
            }}
          /> */}
          <Tab.Screen
            name="OrderHistory"
            component={ChangePassword}
            options={{
              tabBarLabel: 'Tìm kiếm',
              tabBarIcon: ({color}) => (
                <FontAwesome5 name={'search'} size={20} color={color} />
              ),
            }}
          />
         
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarLabel: 'Tìm kiếm',
              tabBarIcon: ({color}) => (
                <FontAwesome5 name={'search'} size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Tìm kiếm',
              tabBarIcon: ({color}) => (
                <FontAwesome5 name={'search'} size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{
              tabBarLabel: 'Tìm kiếm',
              tabBarIcon: ({color}) => (
                <FontAwesome5 name={'search'} size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
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
