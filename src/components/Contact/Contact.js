import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchCategory,
  fetchBrand,
  fetchHotProduct,
} from '../../actions/actions';
const {height, width} = Dimensions.get('window');
const productWidth = width - width * 0.1;
const productHeight = productWidth / 2;
import * as Config from '../../Config/config';
import map from './../../../assets/img/map.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import product from './../../../assets/img/product.png';
import {atan} from 'react-native-reanimated';
const OrderHistory = () => {
  const products = [1, 2, 3, 4, 5];
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <TouchableOpacity>
              <FontAwesome5 name={'angle-left'} size={22} color={'#414dd1'} />
            </TouchableOpacity>
            <Text style={styles.title}>liên hệ</Text>
          </View>
          <View style={styles.listProduct}>
            <View style={styles.googleMap}>
              <Image style={styles.image} source={map} />
            </View>
            <View style={styles.infoContact}>
              <View style={styles.infoItem}>
                <FontAwesome5
                  name={'map-marker-alt'}
                  size={22}
                  color={'#414dd1'}
                />
                <Text style={styles.titleInfo}>Địa chỉ: </Text>
                <Text style={styles.contentInfo}>
                  280 An Dương Vương, Quận 5
                </Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome5 name={'mobile-alt'} size={22} color={'#414dd1'} />
                <Text style={styles.titleInfo}>Điện thoại: </Text>
                <Text style={styles.contentInfo}>000.111.222</Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome5 name={'envelope'} size={22} color={'#414dd1'} />
                <Text style={styles.titleInfo}>Email: </Text>
                <Text style={styles.contentInfo}>ShopApp@ShopApp.com</Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome5 name={'facebook'} size={22} color={'#414dd1'} />
                <Text style={styles.titleInfo}>Facebook: </Text>
                <Text style={styles.contentInfo}>Facebook.com</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  box: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.01,
    shadowRadius: 0.05,
    elevation: 3,
  },
  boxTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d9dade',
    paddingBottom: 6,
    marginBottom: 10,
  },
  title: {
    marginLeft: 14,
    paddingBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5059B6',
    textTransform: 'uppercase',
  },
  listProduct: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  infoContact: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  infoItem: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginBottom: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
  },
  titleInfo: {
    paddingVertical: 14,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    flexGrow: 1,
    color: '#414dd1',
  },
  contentInfo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#414dd1',
  },
  googleMap: {
    width: productWidth + 2,
    height: productHeight + 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.01,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: productWidth,
    height: productHeight,
    alignSelf: 'stretch',
    borderRadius: 10,
  },
});
