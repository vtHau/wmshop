import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import avatar from './../../../assets/img/avatars/avatar.png';
const {height, width} = Dimensions.get('window');
import {Formik} from 'formik';
import {validateUpdatePassword} from '../../utils/validation';

const ChangePassword = (props) => {
  const {navigation} = props;

  const changeInfo = values => {
    console.log(values);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.boxHeader}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <FontAwesome5 name={'angle-left'} size={24} color={'#414dd1'} />
          </TouchableOpacity>
          <Text style={styles.titlePage}>Thong tin tai khoan</Text>
          <View></View>
        </View>
        <View style={styles.boxBackground}>
          <View style={styles.boxImage}>
            <TouchableOpacity style={styles.wrapImage}>
              <Image style={styles.avatarImage} source={avatar} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.boxName}>
          <Text style={styles.userName}>Trung Hau</Text>
          <Text style={styles.status}>Khong gi khong the</Text>
        </View>
        <View style={styles.boxInfo}>
          <Formik
            initialValues={{password: '', newPassword: '', preNewPassword: ''}}
            validationSchema={validateUpdatePassword}
            onSubmit={values => changeInfo(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <>
                <Text style={styles.nameFill}>Mật khẩu hiện tại</Text>
                <View style={styles.infoItem}>
                  <FontAwesome5 name={'key'} size={22} color={'#616161'} />
                  <TextInput
                    style={styles.textInput}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    placeholder="Nhập tên của bạn..."
                  />
                </View>
                {errors.password && touched.password ? (
                  <Text style={styles.errorFill}>{errors.password}</Text>
                ) : null}

                <Text style={styles.nameFill}>Mật khẩu mới</Text>
                <View style={styles.infoItem}>
                  <FontAwesome5 name={'key'} size={22} color={'#616161'} />
                  <TextInput
                    style={styles.textInput}
                    onBlur={handleBlur('newPassword')}
                    onChangeText={handleChange('newPassword')}
                    value={values.newPassword}
                    placeholder="Nhập tên của bạn..."
                  />
                </View>
                {errors.newPassword && touched.newPassword ? (
                  <Text style={styles.errorFill}>{errors.newPassword}</Text>
                ) : null}
                <Text style={styles.nameFill}>Nhập lại mật khẩu mới</Text>
                <View style={styles.infoItem}>
                  <FontAwesome5 name={'key'} size={22} color={'#616161'} />
                  <TextInput
                    style={styles.textInput}
                    onBlur={handleBlur('preNewPassword')}
                    onChangeText={handleChange('preNewPassword')}
                    value={values.preNewPassword}
                    placeholder="Nhập số điện thoại của bạn..."
                  />
                </View>
                {errors.preNewPassword && touched.preNewPassword ? (
                  <Text style={styles.errorFill}>{errors.preNewPassword}</Text>
                ) : null}

                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <View style={styles.changeInfo}>
                    <Text style={styles.textChangeInfo}>Cập nhập</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  textChangeInfo: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
  },
  changeInfo: {
    marginTop: 30,
    backgroundColor: '#003FFF',
    borderRadius: 14,
    alignItems: 'center',
  },
  nameFill: {
    paddingLeft: 20,
    paddingTop: 16,
  },
  errorFill: {
    paddingTop: 2,
    paddingLeft: 10,
    color: 'red',
    fontSize: 14,
  },
  boxInfo: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    marginTop: 4,
    backgroundColor: '#F3F3F3',
    borderRadius: 14,
    paddingLeft: 8,
  },
  textInput: {
    color: '#414dd1',
    marginLeft: 6,
  },
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
  titlePage: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#414dd1',
  },
  boxBackground: {
    paddingBottom: width / 7,
  },
  boxImage: {
    marginTop: 20,
    height: width / 2.5,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  wrapImage: {
    position: 'absolute',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3 + 6,
    height: width / 3 + 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 70,
  },
  avatarImage: {
    borderRadius: 70,
    width: width / 3,
    height: width / 3,
  },
  boxName: {
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    color: '#414dd1',
    fontWeight: 'bold',
  },
  status: {
    textAlign: 'center',
    color: '#a19f9f',
    fontSize: 14,
  },
});
