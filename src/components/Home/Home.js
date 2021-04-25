import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
import product from './../../../assets/img/product.png';

const Home = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>sản phẩm hot</Text>
          </View>
          <TouchableOpacity>
            <Image style={styles.image} source={product} />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>danh mục</Text>
          </View>
          <TouchableOpacity>
            <Image style={styles.image} source={product} />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>thương hiệu</Text>
          </View>
          <TouchableOpacity>
            <Image style={styles.image} source={product} />
          </TouchableOpacity>
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
  image: {
    width: imageWidth,
    height: imageHeight + 15,
    borderRadius: 6,
  },
});
