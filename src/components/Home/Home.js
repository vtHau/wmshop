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
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
const productWidth = (width - 50) / 2 - 16;
const productHeight = (productWidth / 361) * 410;
import Swiper from 'react-native-swiper';
import * as Config from './../../Config/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {renderRating} from './../../utils/common';

const Home = props => {
  const dispatch = useDispatch();
  const cates = useSelector(state => state.cateReducer.cates);
  const brands = useSelector(state => state.brandReducer.brands);
  const hotProducts = useSelector(state => state.productReducer.hotProducts);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBrand());
    dispatch(fetchHotProduct());
  }, [dispatch]);

  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
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
              hotProducts.map((value, key) => (
                <TouchableOpacity key={key} style={styles.boxProduct}>
                  <View style={styles.product}>
                    <Image
                      style={styles.productImage}
                      source={{
                        uri: `${URL}/products/${value.productImage}`,
                      }}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>
                        {value.productName}
                      </Text>
                      <Text style={styles.productPrice}>
                        {value.productPrice}
                      </Text>
                      <View style={styles.starView}>
                        <View style={styles.productStar}>
                          {renderRating(value.productStar)}
                        </View>
                        <View style={styles.productView}>
                          <Text style={styles.productViewText}>
                            {value.productView}
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
    width: '100%',
    marginTop: 6,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: '#d9dade',
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
    fontSize: 14,
  },
});
