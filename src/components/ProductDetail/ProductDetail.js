import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import product from './../../../assets/img/product.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');
const productWidth = width - 200;
const productHeight = productWidth * 1.25;

const ProductDetail = () => {
  const showRatings = rating => {
    var result = [];
    for (var i = 1; i <= rating; i++) {
      result.push(
        <AntDesign key={i} name={'star'} size={14} color={'#f39c11'} />,
      );
    }
    for (var j = 1; j <= 5 - rating; j++) {
      result.push(
        <AntDesign key={100 + j} name={'star'} size={14} color={'grey'} />,
      );
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxImage}>
        <TouchableOpacity style={styles.backIcon}>
          <FontAwesome5 name={'angle-left'} size={20} color={'#878695'} />
        </TouchableOpacity>
        <Image style={styles.image} source={product} />
      </View>

      <View style={styles.boxDetail}>
        <View style={styles.contentInfo}>
          <View style={styles.existProduct}>
            <Text style={styles.exist}>Còn hàng</Text>
            <FontAwesome5 name={'check'} size={14} color={'green'} />
          </View>
          <Text style={styles.productName}>Samsung Galaxy S21</Text>
          <Text style={styles.productPrice}>23.03.000 VND</Text>
          <View style={styles.starView}>
            <View style={styles.productStar}>{showRatings(3)}</View>
            <View style={styles.productView}>
              <Text style={styles.productViewText}>108 </Text>
              <FontAwesome5 name={'eye'} size={18} color={'grey'} />
            </View>
          </View>
          <Text style={styles.productBrand}>Thương hiệu: Samsung</Text>
          <Text style={styles.productDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            distinctio nihil omnis, obcaecati harum, officiis pariatur
            consectetur in.
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.textAddCart}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  boxImage: {
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
    width: 40,
    height: 40,
    top: 20,
    left: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  boxDetail: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    marginBottom: 20,
    width: productWidth,
    height: productHeight,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  contentInfo: {
    paddingVertical: 14,
    paddingLeft: 14,
  },
  textAddCart: {
    paddingHorizontal: 95,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#003FFF',
    borderRadius: 18,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
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
    fontSize: 14,
  },
  existProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
