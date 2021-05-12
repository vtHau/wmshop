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
const {height, width} = Dimensions.get('window');
import * as Config from './../../Config/config';
import {Formik} from 'formik';
import {validateUpdatePassword} from '../../utils/validation';
import ModalView from './../common/ModalView';
import {updatePassword} from './../../utils/checkAPI';
import backgroudProfile from './../../../assets/img/background-profile.png';

const ChangePassword = props => {
  const [wrongPassword, setWrongPassword] = useState(false);
  const [update, setUpdate] = useState(false);
  const {navigation, route} = props;
  const user = route.params;
  const [userID, setUserID] = useState(user.userID);
  const [userFullName, setUserFullName] = useState(user.userFullName);
  const [avatar, setAvatar] = useState(user.userImage);
  const [userStatus, setUserStatus] = useState(user.userStatus);

  const changePassword = async (values, resetForm) => {
    const userInfo = {
      userID,
      password: values.password,
      newPassword: values.newPassword,
    };

    const resUpdate = await updatePassword(userInfo);
    if (resUpdate === 'UPDATE_PASSWORD_FAIL') {
      setWrongPassword(true);
    } else if (resUpdate === 'UPDATE_PASSWORD_SUCCESS') {
      resetForm();
      setModalVisible(true);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  return (
    <ScrollView>
      <ModalView
        title="Cập nhập mật khẩu tài khoản thành công"
        titleButton="OK"
        modalVisible={modalVisible}
        handleModal={handleModal}>
        <FontAwesome5 name={'check-circle'} size={46} color={'#3b72ff'} />
      </ModalView>
      <View style={styles.container}>
        <View style={styles.boxHeader}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <FontAwesome5 name={'angle-left'} size={24} color={'#414dd1'} />
          </TouchableOpacity>
          <Text style={styles.titlePage}>Cập nhập mật khẩu</Text>
          <View></View>
        </View>
        <View style={styles.boxBackground}>
          <View style={styles.boxImage}>
            <Image style={styles.backgroudProfile} source={backgroudProfile} />
            <TouchableOpacity style={styles.wrapImage}>
              <Image
                style={styles.avatarImage}
                source={{
                  uri: `${URL}/avatars/${avatar}`,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.boxName}>
          <View style={styles.boxNameEdit}>
            <Text style={styles.userName}>{userFullName}</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => setUpdate(!update)}>
              <FontAwesome5 name={'pen'} size={14} color={'#414dd1'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.status}>{userStatus}</Text>
        </View>
        <View style={styles.boxInfo}>
          <Formik
            initialValues={{
              password: '',
              newPassword: '',
              preNewPassword: '',
            }}
            validationSchema={validateUpdatePassword}
            onSubmit={(values, {resetForm}) =>
              changePassword(values, resetForm)
            }>
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
                    onFocus={() => setWrongPassword(false)}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    editable={update}
                    placeholder="Nhập mật khẩu hiện tại của bạn..."
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
                    editable={update}
                    placeholder="Nhập mật khẩu mới của bạn..."
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
                    editable={update}
                    placeholder="Nhập lại mật khẩu mới của bạn..."
                  />
                </View>
                {errors.preNewPassword && touched.preNewPassword ? (
                  <Text style={styles.errorFill}>{errors.preNewPassword}</Text>
                ) : null}

                {wrongPassword ? (
                  <Text style={styles.wrongPassword}>
                    Mật khẩu hiện tại của bạn không đúng
                  </Text>
                ) : null}

                {update ? (
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={styles.changeInfo}>
                      <Text style={styles.textChangeInfo}>Cập nhập</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setUpdate(true)}>
                    <View style={styles.changeInfo}>
                      <Text style={styles.textChangeInfo}>Chỉnh sửa</Text>
                    </View>
                  </TouchableOpacity>
                )}
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
  backgroudProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  editIcon: {
    position: 'absolute',
    right: -24,
  },
  boxNameEdit: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
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

  wrongPassword: {
    paddingTop: 10,
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
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
    elevation: 3,
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
