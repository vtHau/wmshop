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

const {height, width} = Dimensions.get('window');
const productWidth = width - width * 0.1;
const productHeight = productWidth / 2;
import map from './../../../assets/img/map.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TitleView from './../common/TitleView';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const OrderHistory = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <TitleView title="Liên hệ" />
        <View style={styles.box}>
          <View style={styles.listProduct}>
            <View style={styles.googleMap}>
              {/* <Image style={styles.image} source={map} /> */}
              <MapView
                style={styles.image}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 10.761573058608514,
                  longitude: 106.68217271221745,
                  latitudeDelta: 0.004,
                  longitudeDelta: 0.002,
                }}>
                <Marker
                  coordinate={{
                    latitude: 10.761573058608514,
                    longitude: 106.68217271221745,
                  }}
                  title="Đại học Sư Phạm Thành Phố Hồ Chí Minh"
                  description="Đại học Sư Phạm Thành Phố Hồ Chí Minh"
                />
              </MapView>
            </View>
            <View style={styles.infoContact}>
              <View style={styles.infoItem}>
                <FontAwesome5
                  name={'map-marker-alt'}
                  size={22}
                  color={'#414dd1'}
                />
                <Text style={styles.titleInfo}>Địa chỉ: </Text>
                <Text style={styles.contentInfo}>
                  280 An Dương Vương, Quận 5
                </Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome5 name={'mobile-alt'} size={22} color={'#414dd1'} />
                <Text style={styles.titleInfo}>Điện thoại: </Text>
                <Text style={styles.contentInfo}>000.111.222</Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome5 name={'envelope'} size={22} color={'#414dd1'} />
                <Text style={styles.titleInfo}>Email: </Text>
                <Text style={styles.contentInfo}>ShopApp@ShopApp.com</Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome5 name={'facebook'} size={22} color={'#414dd1'} />
                <Text style={styles.titleInfo}>Facebook: </Text>
                <Text style={styles.contentInfo}>Facebook.com</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  box: {
    padding: 10,
  },
  listProduct: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  infoContact: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  infoItem: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginBottom: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
  },
  titleInfo: {
    paddingVertical: 14,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    flexGrow: 1,
    color: '#414dd1',
  },
  contentInfo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#414dd1',
  },
  googleMap: {
    width: productWidth + 2,
    height: productHeight + 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.01,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
