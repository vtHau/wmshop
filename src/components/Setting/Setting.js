import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import avatar from './../../../assets/img/avatars/avatar.png';
const {height, width} = Dimensions.get('window');
const boxSize = width / 2 - 40;

const Setting = () => {
  const products = [1, 2, 3, 4];
  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <FontAwesome5 name={'angle-left'} size={24} color={'#414dd1'} />
        <View style={styles.headerItem}>
          <Text style={styles.userName}>Trung Hau</Text>
          <TouchableOpacity>
            <Image style={styles.avatarIcon} source={avatar} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.boxTitle}>
        <Text style={styles.title}>Cài đặt</Text>
      </View>

      <View style={styles.boxListSetting}>
        <View style={styles.boxBig}>
          <TouchableOpacity style={styles.boxBigItem}>
            <FontAwesome5 name={'info-circle'} size={34} color={'#414dd1'} />
            <Text style={styles.boxBigName}>Thông tin</Text>
            <Text style={styles.boxNameDetail}>Xem thông tin tài khoản</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxBigItem}>
            <FontAwesome5 name={'key'} size={34} color={'#414dd1'} />
            <Text style={styles.boxBigName}>Mật khẩu</Text>
            <Text style={styles.boxNameDetail}>
              Thay đổi mật khâu tài khoản
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxListItem}>
          <TouchableOpacity style={styles.settingItem}>
            <FontAwesome5 name={'credit-card'} size={22} color={'#414dd1'} />
            <Text style={styles.titleItem}>Lịch sử thanh toán</Text>
            <FontAwesome5 name={'angle-right'} size={22} color={'#414dd1'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <FontAwesome5 name={'cloud-moon'} size={22} color={'#414dd1'} />
            <Text style={styles.titleItem}>Tiện tích</Text>
            <FontAwesome5 name={'angle-right'} size={20} color={'#414dd1'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <FontAwesome5 name={'sign-out-alt'} size={22} color={'#414dd1'} />
            <Text style={styles.titleItem}>Đăng xuất</Text>
            <FontAwesome5 name={'angle-right'} size={22} color={'#414dd1'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  boxHeader: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#414dd1',
  },
  avatarIcon: {
    marginLeft: 6,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  boxTitle: {
    marginTop: 30,
  },
  title: {
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#414dd1',
  },
  boxListSetting: {
    paddingHorizontal: 10,
  },
  boxBig: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxBigItem: {
    padding: 10,
    backgroundColor: '#F0F2F5',
    width: boxSize,
    height: boxSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  boxBigName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#414dd1',
  },
  boxNameDetail: {
    textAlign: 'center',
    color: '#a19f9f',
    fontSize: 14,
  },
  settingItem: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginBottom: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: boxSize / 2,
    backgroundColor: '#F3F3F3',
    borderRadius: 16,
  },
  titleItem: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    flexGrow: 1,
    color: '#414dd1',
  },
  iconView: {
    // paddingHorizontal: 30,
  },
});
