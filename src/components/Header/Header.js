import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import avatar from './../../../assets/img/avatars/avatar.png';
const {height, width} = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnSearch}>
        <FontAwesome5
          style={styles.searchIcon}
          name={'search'}
          size={18}
          color={'#0077FF'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>WB Shop</Text>
      <TouchableOpacity style={styles.btnSearch}>
        <Image style={styles.avatarIcon} source={avatar} />
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0.05,
    elevation: 6,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  btnSearch: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 50,
  },
  avatarIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  title: {
    fontSize: 20,
    color: '#0077FF',
    fontWeight: 'bold',
  },
});
