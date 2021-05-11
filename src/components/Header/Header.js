import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import * as Config from './../../Config/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Header = props => {
  const {navigation} = props;
  const signIn = useSelector(state => state.authenReducer.signIn);
  const user = useSelector(state => state.authenReducer.userInfo);
  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <FontAwesome5
          style={styles.barsIcon}
          name={'bars'}
          size={22}
          color={'#0077FF'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>App Shop</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.push('SETTING_AUTHEN_CONTAINER')}>
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
    width: 22,
    height: 22,
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
