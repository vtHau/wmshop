import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {TypingAnimation} from 'react-native-typing-animation';
// import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import {validateSignup} from '../../../utils/validation';
import header from './../../../../assets/img/header.png'
import {checkSignIn} from './../../../utils/checkAPI';

function SignIn(props) {
  const {width} = Dimensions.get('screen');
  const dispatch = useDispatch();
  const [typingEmail, setTypingEmail] = useState(false);
  const [statusSignIn, setStatusSignIn] = useState(false);

  const [typingPassword, setTypingPassword] = useState(false);

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
  const pressLogin = async values => {
    setTypingEmail(false);
    setTypingPassword(false);

    const respSignUp = await checkSignUp(values);
    if (respSignUp === 'SIGNUP_SUCCESS') {
      console.log(respSignUp);
    } else if (respSignUp === 'SIGNUP_FAIL') {
      setStatusSignIn(true);
      console.log(respSignUp);
    } else if (respSignUp === 'EMAIL_EXIST') {
      console.log(respSignUp);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{name: '', email: '', password: '', prePassword: ''}}
        validationSchema={validateSignUp}
        onSubmit={values => pressLogin(values)}>
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
              <ImageBackground
                source={header}
                style={styles.imageBackground}>
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
              <Text style={styles.title}>Tên</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textInput}
                  // onFocus={() => focusInput('email')}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder="Nhập họ tên..."
                />
                {/* {typingEmail ? typing : null} */}
              </View>
              {errors.name && touched.name ? (
                <Text style={styles.textError}>{errors.name}</Text>
              ) : null}

              <Text style={[styles.title, {marginTop: 20}]}>Email</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textInput}
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
                  // onFocus={() => focusInput('password')}
                  onBlur={handleBlur('prePassword')}
                  onChangeText={handleChange('prePassword')}
                  value={values.prePassword}
                  placeholder="Nhập lại mật khẩu..."
                />
                {/* {typingPassword ? typing : null} */}
              </View>
              {errors.prePassword && touched.prePassword ? (
                <Text style={styles.textError}>{errors.prePassword}</Text>
              ) : null}

              {statusSignIn ? (
                <Text style={styles.textError}>
                  Email hoặc mật khẩu không đúng
                </Text>
              ) : null}

              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.buttonContainer}>
                  <View style={styles.animation}>
                    <Text style={styles.textLogin}>Đăng ký</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
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
