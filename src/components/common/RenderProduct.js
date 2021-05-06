import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
const {height, width} = Dimensions.get('window');
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
const productWidth = (width - 50) / 2 - 16;
const productHeight = (productWidth / 361) * 410;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Config from './../../Config/config';

import {renderRating} from '../../utils/common';

const RenderProduct = props => {
  const {products, navigation} = props;
  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  return (
    <View style={styles.box}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Danh sách sản phẩm</Text>
      </View>
      <View style={styles.listProduct}>
        {products.length > 0 &&
          products.map((product, key) => (
            <TouchableOpacity
              key={key}
              style={styles.boxProduct}
              onPress={() => {
                console.log('da chay');
                navigation.navigate('PRODUCT_DETAIL', product);
              }}>
              <View style={styles.product}>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: `${URL}/products/${product.productImage}`,
                  }}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.productName}</Text>
                  <Text style={styles.productPrice}>
                    {product.productPrice}
                  </Text>
                  <View style={styles.starView}>
                    <View style={styles.productStar}>
                      {renderRating(product.productStar)}
                    </View>
                    <View style={styles.productView}>
                      <Text style={styles.productViewText}>
                        {product.productView}
                      </Text>
                      <FontAwesome5 name={'eye'} size={18} color={'grey'} />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default RenderProduct;

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: '#d9dade',
    marginBottom: 10,
  },
  title: {
    paddingBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  boxImage: {
    height: imageHeight + 15,
  },
  listProduct: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  boxProduct: {
    padding: 5,
    width: '50%',
  },
  product: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: '#e8e9ed',
  },
  productImage: {
    width: productWidth,
    height: productHeight,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  productInfo: {
    width: '100%',
    marginTop: 6,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderColor: '#e8e9ed',
  },
  productName: {
    color: '#5059B6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
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
    marginRight: 4,
    fontSize: 14,
  },
});
