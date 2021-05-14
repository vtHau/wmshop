import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as Config from './../config/config';

const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

const Header = props => {
  const {navigation} = props;
  const signIn = useSelector(state => state.authenReducer.signIn);
  const user = useSelector(state => state.authenReducer.userInfo);

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <FontAwesome5
          style={styles.barsIcon}
          name={'bars'}
          size={22}
          color={'#0077FF'}
        />
      </View>
      <Text style={styles.title}>MW Store</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.push('MENU_NAVIGATION')}>
        {signIn !== undefined && signIn === true ? (
          <Image
            style={styles.avatarIcon}
            source={{
              uri: `${URL}/avatars/${user.userImage}`,
            }}
          />
        ) : (
          <FontAwesome5
            style={styles.avatarIcon}
            name={'user-circle'}
            size={22}
            color={'#0077FF'}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 50,
  },
  avatarIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 50,
  },
  barsIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
  },
  title: {
    fontSize: 20,
    color: '#0077FF',
    fontWeight: 'bold',
  },
});
