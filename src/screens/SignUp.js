import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TypingAnimation} from 'react-native-typing-animation';
import {Formik} from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {checkEmail, sendEmail} from './../actions/actions';
import {validateSignUp} from './../utils/validation';
import ModalView from './../components/ModalView';
import header from './../assets/img/header.png';

const randomCode = () => {
  let code = '';
  for (var i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

function SignUp(props) {
  const {navigation} = props;
  const [typingEmail, setTypingEmail] = useState(false);
  const [statusSignIn, setStatusSignIn] = useState(false);
  const [statusSignUp, setStatusSignUp] = useState(false);
  const [typingPassword, setTypingPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(true);

  const handleModal = () => {
    setModalVisible(!modalVisible);
    navigation.pop();
  };
  const typing = (
    <TypingAnimation
      dotColor="#93278f"
      style={{marginRight: 25, marginTop: 20}}
    />
  );
  const focusInput = value => {
    setStatusSignIn(false);

    if (value === 'email') {
      setTypingEmail(true);
      setTypingPassword(false);
    } else {
      setTypingEmail(false);
      setTypingPassword(true);
    }
  };
  const signUpAccount = async values => {
    setTypingEmail(false);
    setStatusSignUp(false);
    setTypingPassword(false);
    setStatus(false);

    const resp = await checkEmail(values);
    if (!resp) {
      const info = {
        ...values,
        code: randomCode(),
      };
      const resp = await sendEmail(info);
      if (resp) {
        navigation.replace('CONFIRM_CODE', info);
      } else {
        setStatus(true);
      }
    } else {
      setStatus(true);
      setStatusSignIn(true);
    }
  };

  return (
    <View style={styles.container}>
      <ModalView
        title="Đăng ký tài khoản thành công"
        titleButton="OK"
        modalVisible={modalVisible}
        handleModal={handleModal}>
        <FontAwesome5 name={'check-circle'} size={46} color={'#3b72ff'} />
      </ModalView>
      <TouchableOpacity style={styles.boxBack} onPress={() => navigation.pop()}>
        <FontAwesome5 name={'angle-left'} size={26} color={'#fff'} />
      </TouchableOpacity>
      <Formik
        initialValues={{name: '', email: '', password: '', prePassword: ''}}
        validationSchema={validateSignUp}
        onSubmit={values => signUpAccount(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <>
            <View style={styles.header}>
              <ImageBackground source={header} style={styles.imageBackground}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
                  Xin chào !!!
                </Text>
                <Text style={{color: 'yellow', fontWeight: 'bold'}}>
                  Đăng ký tài khoản
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.footer}>
              <ScrollView>
                <Text style={styles.title}>Tên</Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    onBlur={handleBlur('name')}
                    onChangeText={handleChange('name')}
                    value={values.name}
                    placeholder="Nhập họ tên..."
                  />
                </View>
                {errors.name && touched.name ? (
                  <Text style={styles.textError}>{errors.name}</Text>
                ) : null}

                <Text style={[styles.title, {marginTop: 20}]}>Email</Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    onFocus={() => focusInput('email')}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    placeholder="Nhập địa chỉ Email..."
                  />
                  {typingEmail ? typing : null}
                </View>
                {errors.email && touched.email ? (
                  <Text style={styles.textError}>{errors.email}</Text>
                ) : null}

                <Text style={[styles.title, {marginTop: 20}]}>Mật khẩu</Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    onFocus={() => focusInput('password')}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    placeholder="Nhập mật khẩu..."
                  />
                  {typingPassword ? typing : null}
                </View>
                {errors.password && touched.password ? (
                  <Text style={styles.textError}>{errors.password}</Text>
                ) : null}

                <Text style={[styles.title, {marginTop: 20}]}>
                  Xác nhận mật khẩu
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    color="#414dd1"
                    underlineColorAndroid="transparent"
                    onBlur={handleBlur('prePassword')}
                    onChangeText={handleChange('prePassword')}
                    value={values.prePassword}
                    placeholder="Nhập lại mật khẩu..."
                  />
                </View>
                {errors.prePassword && touched.prePassword ? (
                  <Text style={styles.textError}>{errors.prePassword}</Text>
                ) : null}

                {statusSignIn ? (
                  <Text style={styles.emailExist}>
                    Địa chỉ Email đã tồn tại
                  </Text>
                ) : null}
                {statusSignUp ? (
                  <Text style={styles.emailExist}>
                    Đăng ký tài khoản không thành công
                  </Text>
                ) : null}
                {status ? (
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.buttonContainer}>
                      <View style={styles.animation}>
                        <Text style={styles.textLogin}>Đăng ký</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <View style={styles.buttonContainer}>
                      <View style={styles.animationDis}>
                        <Text style={styles.textLogin}>Đăng ký</Text>
                      </View>
                    </View>
                  </View>
                )}

                <View style={styles.btnSignUp}>
                  <TouchableOpacity
                    onPress={() => navigation.replace('SIGN_IN')}>
                    <Text style={styles.textSignIn}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  emailExist: {
    paddingTop: 10,
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  boxBack: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 20,
  },
  textSignIn: {
    marginVertical: 4,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#93278f',
    fontWeight: 'bold',
  },
  btnSignUp: {
    marginTop: 10,
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    padding: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    marginLeft: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    fontSize: 15,
    paddingBottom: 5,
    color: 'gray',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    backgroundColor: '#93278f',
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationDis: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textError: {
    paddingLeft: 5,
    fontSize: 13,
    color: 'red',
  },
});
