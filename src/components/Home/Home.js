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
import {fetchCategory, fetchBrand} from './../../actions/actions';
const {height, width} = Dimensions.get('window');
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
import Swiper from 'react-native-swiper';
import * as Config from './../../Config/config';
import product from './../../../assets/img/product.png';

const Home = props => {
  const dispatch = useDispatch();
  const cates = useSelector(state => state.cateReducer.cates);
  const brands = useSelector(state => state.brandReducer.brands);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBrand());
  }, [dispatch]);

  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>sản phẩm hot</Text>
          </View>
          <Swiper showsButtons={true} style={styles.boxImage}>
            <TouchableOpacity>
              <Image style={styles.image} source={product} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.image} source={product} />
            </TouchableOpacity>
          </Swiper>
        </View>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>danh mục</Text>
          </View>
          <Swiper
            autoplay
            autoplayTimeout={2.5}
            showsButtons={true}
            style={styles.boxImage}>
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
          <Swiper
            autoplay
            autoplayTimeout={2.5}
            showsButtons={true}
            style={styles.boxImage}>
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
    resizeMode: 'cover',
  },
});
