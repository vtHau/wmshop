import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

import {
  fetchCart,
  updateCartQuantity,
  deleteCart,
  insertOrderHistory,
} from './../actions/actions';
import * as Config from './../config/config';

const {width} = Dimensions.get('window');
const productWidth = width / 4.5;
const productHeight = productWidth * 1.2;
const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

const Cart = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [disBtn, setDisBtn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const carts = useSelector(state => state.cartReducer.carts);

  let totalMoney = 0;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (carts.length < 1) {
      setDisBtn(true);
    } else {
      setDisBtn(false);
    }
  }, [carts]);

  const onRefresh = () => {
    setRefresh(true);
    dispatch(fetchCart());
    setRefresh(false);
  };

  carts.forEach(cart => {
    totalMoney += cart.productQuantity * cart.productPrice;
  });

  const updateQuantity = (cartID, quantity) => {
    if (quantity >= 1) {
      dispatch(updateCartQuantity(cartID, quantity));
    }
  };
  const deleteCarts = cartID => {
    dispatch(deleteCart(cartID));
  };

  const payProduct = async () => {
    setDisBtn(true);
    const resp = await insertOrderHistory();
    if (resp) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Mua sản phẩm thành công',
        text2: 'Mua thành công, vào lịch sử đơn hàng kể kiểm tra',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      Alert('Mua sản phầm thất bại');
    }
    setDisBtn(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <View style={styles.box}>
          <Text style={styles.title}>giỏ hàng</Text>
          <View style={styles.products}>
            {carts.length > 0 &&
              carts.map((cart, key) => (
                <View key={key} style={styles.productContainer}>
                  <View style={styles.product}>
                    <TouchableOpacity
                      onPress={() => navigation.push('PRODUCT_DETAIL', cart)}>
                      <Image
                        style={styles.productImage}
                        source={{
                          uri: `${URL}/products/${cart.productImage}`,
                        }}
                      />
                    </TouchableOpacity>
                    <View style={styles.productInfo}>
                      <TouchableOpacity
                        onPress={() => navigation.push('PRODUCT_DETAIL', cart)}>
                        <Text style={styles.productName}>
                          {cart.productName}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.productPrice}>
                        {cart.productPrice}
                      </Text>
                      <View style={styles.boxQuantity}>
                        <TouchableOpacity
                          onPress={() =>
                            updateQuantity(
                              cart.cartID,
                              Number(cart.productQuantity) - 1,
                            )
                          }>
                          <FontAwesome5
                            name={'angle-left'}
                            size={18}
                            color={'#4d4d4d'}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>
                          {cart.productQuantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            updateQuantity(
                              cart.cartID,
                              Number(cart.productQuantity) + 1,
                            )
                          }>
                          <FontAwesome5
                            name={'angle-right'}
                            size={18}
                            color={'#4d4d4d'}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.totalMoneyProduct}>
                        Tổng tiền: {cart.productPrice * cart.productQuantity}{' '}
                        VND
                      </Text>
                    </View>
                    <View style={styles.close}>
                      <TouchableOpacity
                        onPress={() => deleteCarts(cart.cartID)}>
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
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomAction}>
        <View style={styles.boxTotal}>
          <Text
            style={!disBtn > 0 ? styles.totalMoney : styles.disableTotalMoney}>
            Tổng cộng: {totalMoney} VND
          </Text>
        </View>
        {disBtn ? (
          <View style={styles.btnPayment}>
            <Text style={styles.disablePayment}>Mua hàng</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.btnPayment} onPress={payProduct}>
            <Text style={styles.payment}>Mua hàng</Text>
          </TouchableOpacity>
        )}
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  bottomAction: {
    position: 'absolute',
    paddingVertical: 4,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 0.6,
    borderColor: '#e8e9ed',
  },
  btnPayment: {
    marginVertical: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 100,
    backgroundColor: '#fff',
  },
  title: {
    marginLeft: 16,
    paddingBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5059B6',
    textTransform: 'uppercase',
  },
  products: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  productContainer: {
    paddingVertical: 5,
    width: '100%',
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 0.6,
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
    flex: 1,
    height: '100%',
    marginVertical: 6,
    paddingHorizontal: 6,
  },
  productName: {
    flexGrow: 1,
    fontSize: 16,
    color: '#414dd1',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  productPrice: {
    flexGrow: 1,
    color: '#4d4d4d',
    fontSize: 14,
  },

  payment: {
    paddingVertical: 14,
    width: '90%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    backgroundColor: '#003FFF',
    borderRadius: 16,
  },
  disablePayment: {
    paddingVertical: 14,
    width: '90%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    backgroundColor: '#ccc',
    borderRadius: 16,
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
    color: '#4d4d4d',
    paddingHorizontal: 18,
  },
  totalMoneyProduct: {
    flexGrow: 1,
    color: '#4d4d4d',
    alignItems: 'center',
  },
  boxTotal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 14,
  },
  totalMoney: {
    paddingRight: 4,
    fontSize: 15,
    color: '#414dd1',
    fontWeight: 'bold',
  },
  disableTotalMoney: {
    paddingRight: 4,
    fontSize: 15,
    color: '#ccc',
    fontWeight: 'bold',
  },
  close: {
    height: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 10,
  },
});
