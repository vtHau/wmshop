import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchCategory,
  fetchBrand,
  fetchHotProduct,
} from './../../actions/actions';
const {height, width} = Dimensions.get('window');
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
const productWidth = (width - 50) / 2 - 16;
const productHeight = (productWidth / 361) * 410;
import Swiper from 'react-native-swiper';
import * as Config from './../../Config/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {renderRating} from './../../utils/common';

const Home = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);

  const cates = useSelector(state => state.cateReducer.cates);
  const brands = useSelector(state => state.brandReducer.brands);
  const hotProducts = useSelector(state => state.productReducer.hotProducts);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBrand());
    dispatch(fetchHotProduct());
  }, [dispatch]);

  const onRefresh = () => {
    setRefresh(true);
    dispatch(fetchHotProduct());
    setRefresh(false);
  };

  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>sản phẩm hot</Text>
          </View>
          <Swiper
            autoplay
            autoplayTimeout={2.5}
            showsButtons={true}
            style={styles.boxImage}>
            {hotProducts.length > 0 &&
              hotProducts.map((value, key) => (
                <TouchableOpacity key={key}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${URL}/products/${value.productImage}`,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </Swiper>
        </View>

        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>danh mục</Text>
          </View>
          <Swiper showsButtons={true} style={styles.boxImage}>
            {cates.length > 0 &&
              cates.map((value, key) => (
                <TouchableOpacity key={key}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${URL}/categorys/${value.catImage}`,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </Swiper>
        </View>

        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>thương hiệu</Text>
          </View>
          <Swiper showsButtons={true} style={styles.boxImage}>
            {brands.length > 0 &&
              brands.map((value, key) => (
                <TouchableOpacity key={key}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${URL}/brands/${value.brandImage}`,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </Swiper>
        </View>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>sản phẩm moi</Text>
          </View>
          <View style={styles.listProduct}>
            {hotProducts.length > 0 &&
              hotProducts.map((product, key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.boxProduct}
                  onPress={() => navigation.push('PRODUCT_DETAIL', product)}>
                  <View style={styles.product}>
                    <Image
                      style={styles.productImage}
                      source={{
                        uri: `${URL}/products/${product.productImage}`,
                      }}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>
                        {product.productName}
                      </Text>
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
      </View>
    </ScrollView>
  );
};

export default Home;

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
    borderWidth: 1.2,
    borderColor: '#e8e9ed',
  },
  boxTitle: {
    borderBottomWidth: 1,
    borderColor: '#e8e9ed',
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
  image: {
    width: imageWidth,
    height: imageHeight + 15,
    borderRadius: 6,
    resizeMode: 'stretch',
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
