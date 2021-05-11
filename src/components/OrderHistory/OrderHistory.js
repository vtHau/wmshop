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
import * as Config from '../../Config/config';
import {fetchOrderHistory} from './../../actions/actions';
import TitleView from './../common/TitleView';

const {width} = Dimensions.get('window');
const productWidth = width / 4.5;
const productHeight = productWidth * 1.2;
const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

const OrderHistory = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const orderHistorys = useSelector(
    state => state.orderHistoryReducer.orderHistorys,
  );

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <TitleView title="Lịch sử đặt hàng" navigation={navigation} />
        <Text style={styles.title}>Danh sách sản phẩm</Text>
        <View style={styles.listProduct}>
          {orderHistorys.length > 0 &&
            orderHistorys.map((orderHistory, key) => (
              <View key={key} style={styles.boxProduct}>
                <View style={styles.product}>
                  <TouchableOpacity>
                    <Image
                      style={styles.productImage}
                      source={{
                        uri: `${URL}/products/${orderHistory.productImage}`,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={styles.productInfo}>
                    <TouchableOpacity>
                      <Text style={styles.productName}>
                        {orderHistory.productName}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>
                      Số lương: {orderHistory.productQuantity}
                    </Text>
                    <Text style={styles.totalMoneyProduct}>
                      Tổng tiền: {orderHistory.productPrice} VND
                    </Text>
                    <Text style={styles.timeOrder}>
                      Thời gian: {orderHistory.timeOrder}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  title: {
    paddingTop: 14,
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
    borderLeftColor: '#e8e9ed',
    borderLeftWidth: 0.6,
    flex: 1,
    height: '100%',
    marginVertical: 6,
    paddingHorizontal: 6,
  },
  productName: {
    flexGrow: 1,
    color: '#414dd1',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timeOrder: {
    flexGrow: 1,
    color: '#4d4d4d',
    fontSize: 14,
  },
  quantity: {
    flexGrow: 1,
    fontSize: 14,
    color: '#4d4d4d',
  },
  totalMoneyProduct: {
    flexGrow: 1,
    color: '#4d4d4d',
  },
});
