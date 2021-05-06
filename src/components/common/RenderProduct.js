import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Config from './../../Config/config';
import {renderRating} from '../../utils/common';

const {height, width} = Dimensions.get('window');
const productWidth = (width - 50) / 2 - 16;
const productHeight = (productWidth / 361) * 410;
const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

const RenderProduct = props => {
  const {title, style, products, navigation} = props;

  return (
    <View style={style}>
      <Text style={styles.title}>{title || 'Danh sách sản phẩm'}</Text>
      <View style={styles.products}>
        {products.length > 0 &&
          products.map((product, key) => (
            <TouchableOpacity
              key={key}
              style={styles.boxProduct}
              onPress={() => {
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
                      <Text style={styles.productTextView}>
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
  title: {
    paddingLeft: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#414dd1',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  products: {
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
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: '#e8e9ed',
  },
  productImage: {
    width: productWidth,
    height: productHeight,
    resizeMode: 'contain',
    borderRadius: 4,
  },
  productInfo: {
    flexGrow: 1,
    width: '100%',
    marginTop: 6,
    paddingTop: 4,
    paddingHorizontal: 4,
    borderTopWidth: 0.6,
    borderColor: '#e8e9ed',
  },
  productName: {
    color: '#414dd1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#4d4d4d',
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
  productTextView: {
    color: '#4d4d4d',
    fontSize: 14,
    marginRight: 4,
  },
});
