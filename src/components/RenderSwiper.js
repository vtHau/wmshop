import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

import * as Config from '../config/config';

const {width} = Dimensions.get('window');
const imageWidth = width - 25;
const imageHeight = (imageWidth / 933) * 465;
const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

const RenderSwiper = props => {
  const {items, title, type, navigation, style, autoplay} = props;

  return (
    <View style={style}>
      <Text style={styles.title}>{title || 'Danh sách sản phẩm'}</Text>
      <View style={styles.items}>
        <Swiper
          autoplay={autoplay}
          showsButtons
          loop={false}
          style={styles.item}>
          {items.length > 0 &&
            items.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  navigation.push(
                    `${type ? 'PRODUCT_DETAIL' : 'PRODUCT_LIST'}`,
                    item,
                  )
                }>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${URL}/${
                      type
                        ? 'products'
                        : item.brandImage
                        ? 'brands'
                        : 'categorys'
                    }/${item.brandImage || item.catImage || item.productImage}`,
                  }}
                />
              </TouchableOpacity>
            ))}
        </Swiper>
      </View>
    </View>
  );
};

export default RenderSwiper;

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
  items: {
    padding: 6,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
  },
  item: {
    height: imageHeight,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 4,
    borderWidth: 0.6,
    borderColor: '#e8e9ed',
    resizeMode: 'stretch',
  },
});
