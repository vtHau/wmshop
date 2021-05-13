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

import {useDispatch} from 'react-redux';
const {width} = Dimensions.get('window');
import * as Config from './../../Config/config';
import {Formik} from 'formik';
import {validateUpdateProfile} from './../../utils/validation';
import {updateInfo} from './../../utils/checkAPI';
import {signInToken} from './../../actions/actions';
import ModalView from './../common/ModalView';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import backgroudProfile from './../../../assets/img/background-profile.png';

const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

const Proflie = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const user = route.params;

  const [userID, setUserID] = useState(user.userID);
  const [name, setName] = useState(user.userFullName);
  const [email, setEmail] = useState(user.userEmail);
  const [phone, setPhone] = useState(user.userPhone);
  const [status, setStatus] = useState(user.userStatus);
  const [avatar, setAvatar] = useState(user.userImage);
  const [update, setUpdate] = useState(false);
  const [updating, setUpdating] = useState(false);

  const changeInfo = async info => {
    const userInfo = {
      userID,
      ...info,
    };
    setUpdating(true);
    const resUpdate = await updateInfo(userInfo);
    if (resUpdate.trim() === 'UPDATE_INFO_SUCCESS') {
      setModalVisible(!modalVisible);
      await dispatch(signInToken());
      setUpdate(false);
    }
    setUpdating(false);
  };
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>
      <ModalView
        title="Đăng ký tài khoản thành công"
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
          <Text style={styles.titlePage}>Thông tin tài khoản</Text>
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
            <Text style={styles.userName}>{name}</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => setUpdate(true)}>
              <FontAwesome5 name={'pen'} size={14} color={'#414dd1'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.status}>{status}</Text>
        </View>
        <View style={styles.boxInfo}>
          <Formik
            initialValues={{name, email, phone, status}}
            validationSchema={validateUpdateProfile}
            onSubmit={info => changeInfo(info)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <>
                <Text style={styles.nameFill}>Tên</Text>
                <View style={styles.infoItem}>
                  <FontAwesome5 name={'user'} size={22} color={'#616161'} />
                  <TextInput
                    style={styles.textInput}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    onBlur={handleBlur('name')}
                    onChangeText={handleChange('name')}
                    value={values.name}
                    placeholder="Nhập tên của bạn..."
                    editable={update}
                  />
                </View>
                {errors.name && touched.name ? (
                  <Text style={styles.errorFill}>{errors.name}</Text>
                ) : null}

                <Text style={styles.nameFill}>Email</Text>
                <View style={styles.infoItem}>
                  <FontAwesome5 name={'envelope'} size={22} color={'#616161'} />
                  <TextInput
                    style={styles.textInput}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    editable={false}
                  />
                </View>

                <Text style={styles.nameFill}>Điện thoại</Text>
                <View style={styles.infoItem}>
                  <FontAwesome5
                    name={'mobile-alt'}
                    size={22}
                    color={'#616161'}
                  />
                  <TextInput
                    style={styles.textInput}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    onBlur={handleBlur('phone')}
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                    placeholder="Nhập số điện thoại của bạn..."
                    editable={update}
                  />
                </View>
                {errors.phone && touched.phone ? (
                  <Text style={styles.errorFill}>{errors.phone}</Text>
                ) : null}

                <Text style={styles.nameFill}>Trạng thái</Text>
                <View style={styles.infoItem}>
                  <FontAwesome5
                    name={'info-circle'}
                    size={22}
                    color={'#616161'}
                  />
                  <TextInput
                    style={styles.textInput}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    onBlur={handleBlur('status')}
                    onChangeText={handleChange('status')}
                    value={values.status}
                    placeholder="Nhập trạng thái của bạn..."
                    editable={update}
                  />
                </View>

                {update ? (
                  <>
                    {!updating ? (
                      <TouchableOpacity onPress={() => handleSubmit()}>
                        <View style={styles.changeInfo}>
                          <Text style={styles.textChangeInfo}>Cập nhập</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => handleSubmit()}>
                        <View style={styles.changeInfo}>
                          <Text
                            style={[
                              styles.textChangeInfo,
                              styles.disableChangeInfo,
                            ]}>
                            Cập nhập
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
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

export default Proflie;

const styles = StyleSheet.create({
  backgroudProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  boxNameEdit: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    right: -24,
  },
  textChangeInfo: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
  },
  disableChangeInfo: {
    backgroundColor: 'grey',
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
