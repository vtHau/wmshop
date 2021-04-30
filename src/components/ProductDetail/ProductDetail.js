import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {renderRating} from './../../utils/common';

import * as Config from './../../Config/config';

const {height, width} = Dimensions.get('window');
const productWidth = width - 200;
const productHeight = productWidth * 1.25;

const ProductDetail = props => {
  const {navigation, route} = props;
  const product = route.params;

  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.boxImage}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.pop()}>
            <FontAwesome5 name={'angle-left'} size={28} color={'#003FFF'} />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: `${URL}/products/${product.productImage}`,
            }}
          />
        </View>

        <View style={styles.boxDetail}>
          <View style={styles.contentInfo}>
            <View style={styles.existProduct}>
              <Text style={styles.exist}>
                {product.productQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}
              </Text>
              <FontAwesome5 name={'check'} size={14} color={'green'} />
            </View>
            <Text style={styles.productName}>{product.productName}</Text>
            <TouchableOpacity style={styles.boxPrice}>
              <FontAwesome5 name={'dollar-sign'} size={16} color={'#003FFF'} />
              <Text style={styles.productPrice}>
                {product.productPrice} VND
              </Text>
            </TouchableOpacity>
            <View style={styles.starView}>
              <View style={styles.productStar}>{renderRating(3)}</View>
              <View style={styles.productView}>
                <Text style={styles.productViewText}>
                  {product.productView}
                </Text>
                <FontAwesome5 name={'eye'} size={18} color={'grey'} />
              </View>
            </View>
            <Text style={styles.productBrand}>
              Thương hiệu: {product.brandName}
            </Text>
            <Text style={styles.productDesc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              velit omnis laborum ducimus, aperiam, ab sequi aspernatur
            </Text>
          </View>
        </View>
      </ScrollView>

      {product.productQuantity > 0 ? (
        <TouchableOpacity style={styles.btnAddCart}>
          <Text style={styles.textAddCart}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.btnAddCart}>
          <Text style={[styles.textAddCart, styles.textAddCartDisable]}>
            Thêm vào giỏ hàng
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  boxImage: {
    paddingTop: 24,
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 0.05,
    elevation: 1.5,
  },
  backIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    top: 20,
    left: 20,
  },
  boxDetail: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    marginBottom: 0,
    width: productWidth,
    height: productHeight,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  contentInfo: {
    paddingVertical: 14,
    paddingLeft: 14,
  },

  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  boxPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    marginTop: 2,
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productBrand: {
    marginTop: 4,
    fontSize: 15,
    color: '#8a8a8a',
  },
  productDesc: {
    marginTop: 4,
    fontSize: 16,
    color: '#8a8a8a',
  },
  exist: {
    marginTop: 4,
    marginRight: 4,
    fontSize: 15,
    color: '#003FFF',
  },
  starView: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productView: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  productViewText: {
    marginRight: 4,
    fontSize: 14,
  },
  existProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnAddCart: {
    borderTopWidth: 1.1,
    borderColor: '#e8e9ed',
    position: 'absolute',
    paddingHorizontal: 24,
    paddingVertical: 6,
    backgroundColor: '#fff',
    width: '100%',
    bottom: 0,
  },
  textAddCart: {
    textAlign: 'center',
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#003FFF',
    borderRadius: 18,
    textTransform: 'uppercase',
  },
  textAddCartDisable: {
    backgroundColor: '#ccc',
  },
});
