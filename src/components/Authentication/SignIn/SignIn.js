import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {TypingAnimation} from 'react-native-typing-animation';
import {Formik} from 'formik';
import {validateSignIn} from './../../../utils/validation';
import header from './../../../../assets/img/header.png';
import {checkSignIn} from './../../../actions/actions';
import {signIn} from './../../../actions/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function SignIn(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [typingEmail, setTypingEmail] = useState(false);
  const [statusSignIn, setStatusSignIn] = useState(true);
  const [typingPassword, setTypingPassword] = useState(false);

  const typing = (
    <TypingAnimation
      dotColor="#93278f"
      style={{marginRight: 25, marginTop: 20}}
    />
  );
  const focusInput = value => {
    setStatusSignIn(true);

    if (value === 'email') {
      setTypingEmail(true);
      setTypingPassword(false);
    } else {
      setTypingEmail(false);
      setTypingPassword(true);
    }
  };
  const btnSignIn = async values => {
    setTypingEmail(false);
    setTypingPassword(false);

    const respSignIn = await checkSignIn(values);
    if (respSignIn !== 'SIGIN_FAIL') {
      setStatusSignIn(true);
      dispatch(signIn(respSignIn));
    } else {
      setStatusSignIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boxBack} onPress={() => navigation.pop()}>
        <FontAwesome5 name={'angle-left'} size={26} color={'#fff'} />
      </TouchableOpacity>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validateSignIn}
        onSubmit={values => btnSignIn(values)}>
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
                  Đăng nhập để tiếp tục
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.footer}>
              <ScrollView>
                <View style={styles.boxInput}>
                  <Text style={styles.title}>Email</Text>
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
                      color="#414dd1"
                      underlineColorAndroid="transparent"
                      secureTextEntry={true}
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

                  {!statusSignIn ? (
                    <Text style={styles.loginFail}>
                      Email hoặc mật khẩu không đúng
                    </Text>
                  ) : null}
                </View>

                <View style={styles.boxAction}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.buttonContainer}>
                      <View style={styles.animation}>
                        <Text style={styles.textLogin}>Đăng nhập</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.btnSignUp}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SIGN_UP')}>
                      <Text style={styles.textSignIn}>Đăng ký</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  boxAction: {
    marginTop: '35%',
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
  boxInput: {
    padding: 20,
  },
  footer: {
    justifyContent: 'space-between',
    flex: 2,
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
    paddingTop: 4,
    marginLeft: 4,
    fontSize: 13,
    color: 'red',
  },

  loginFail: {
    textAlign: 'center',
    paddingTop: 14,
    fontSize: 13,
    color: 'red',
  },
});
