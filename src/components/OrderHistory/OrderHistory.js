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
const productWidth = width / 4.5;
const productHeight = productWidth * 1.2;
import * as Config from '../../Config/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import product from './../../../assets/img/product.png';
const OrderHistory = props => {
  const {navigation} = props;
  const products = [1, 2, 3, 4, 5];
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <FontAwesome5 name={'angle-left'} size={24} color={'#414dd1'} />
            </TouchableOpacity>
            <Text style={styles.title}>lịch sử đặt hàng</Text>
          </View>
          <View style={styles.listProduct}>
            {products.length > 0 &&
              products.map((value, key) => (
                <View key={key} style={styles.boxProduct}>
                  <View style={styles.product}>
                    <TouchableOpacity>
                      <Image style={styles.productImage} source={product} />
                    </TouchableOpacity>
                    <View style={styles.productInfo}>
                      <TouchableOpacity>
                        <Text style={styles.productName}>
                          Samsung Galaxy S20
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>Số lương: 1</Text>
                      <Text style={styles.totalMoneyProduct}>
                        Tổng tiền: 4656535
                      </Text>
                      <Text style={styles.timeOrder}>Thời gian: 12345678</Text>
                    </View>
                  </View>
                </View>
              ))}
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
  boxProduct: {
    paddingVertical: 5,
    width: '100%',
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d9dade',
  },
  productImage: {
    width: productWidth,
    height: productHeight,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  productInfo: {
    paddingVertical: 4,
    marginLeft: 4,
    borderLeftColor: '#d9dade',
    borderLeftWidth: 1,
    flex: 1,
    height: '100%',
    marginVertical: 6,
    paddingHorizontal: 6,
  },
  productName: {
    flexGrow: 1,
    fontSize: 14,
    color: '#5B6397',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timeOrder: {
    flexGrow: 1,
    color: '#5B6397',
    fontSize: 14,
  },
  quantity: {
    flexGrow: 1,
    fontSize: 14,
    color: '#616161',
  },
  totalMoneyProduct: {
    flexGrow: 1,
    color: '#616161',
  },
});
