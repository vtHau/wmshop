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
} from './../../actions/actions';
const {height, width} = Dimensions.get('window');
const productWidth = width / 4.5;
const productHeight = productWidth * 1.2;
import * as Config from './../../Config/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {renderRating} from './../../utils/common';

import product from './../../../assets/img/product.png';
const Cart = () => {
  const products = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1];
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <TouchableOpacity>
              <FontAwesome5 name={'angle-left'} size={22} color={'#414dd1'} />
            </TouchableOpacity>
            <Text style={styles.title}>giỏ hàng</Text>
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
                        <Text style={styles.productName}>samsung s20</Text>
                      </TouchableOpacity>
                      <Text style={styles.productPrice}>12345678</Text>
                      <View style={styles.boxQuantity}>
                        <TouchableOpacity>
                          <FontAwesome5
                            name={'angle-left'}
                            size={18}
                            color={'#616161'}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>1</Text>
                        <TouchableOpacity>
                          <FontAwesome5
                            name={'angle-right'}
                            size={18}
                            color={'#616161'}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.totalMoneyProduct}>
                        Tổng tiền: 4656535
                      </Text>
                    </View>
                    <View style={styles.boxClose}>
                      <TouchableOpacity>
                        <FontAwesome5
                          style={styles.inDeQuantity}
                          name={'times'}
                          size={18}
                          color={'#5059B6'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            <View style={styles.boxTotal}>
              <Text style={styles.totalMoney}>Tổng cộng: 2222.565656</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.btnPayment}>
          <Text style={styles.payment}>Mua hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Cart;

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
    borderColor: '#e8e9ed',
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
    fontSize: 16,
    color: '#5059B6',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  productPrice: {
    flexGrow: 1,
    color: '#5B6397',
    fontSize: 14,
  },
  starView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productView: {
    flexDirection: 'row',
  },
  productViewText: {
    fontSize: 14,
  },
  btnPayment: {
    width: '99%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 4,
  },
  payment: {
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  boxQuantity: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#616161',
    paddingHorizontal: 18,
  },
  totalMoneyProduct: {
    flexGrow: 1,
    color: '#616161',
    alignItems: 'center',
  },
  boxTotal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  totalMoney: {
    paddingRight: 4,
    fontSize: 15,
    color: '#616161',
    fontWeight: 'bold',
  },
  boxClose: {
    height: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 10,
  },
});
