import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {TypingAnimation} from 'react-native-typing-animation';

function Login(props) {
  const {width} = Dimensions.get('screen');

  const [typingEmail, setTypingEmail] = useState(false);
  const [typingPassword, setTypingPassword] = useState(false);

  const focusInput = value => {
    if (value === 'email') {
      setTypingEmail(true);
      setTypingPassword(false);
    } else {
      setTypingEmail(false);
      setTypingPassword(true);
    }
  };

  const typing = (
    <TypingAnimation
      dotColor="#93278f"
      style={{marginRight: 25, marginTop: 10}}
    />
  );

  const pressLogin = () => {
    setTypingEmail(false);
    setTypingPassword(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require('./../../../assets/img/header.png')}
          style={styles.imageBackground}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
            Welcome back
          </Text>
          <Text style={{color: 'yellow'}}>Sign in to continue</Text>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Email</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onFocus={() => focusInput('email')}
            placeholder="Nhập địa chỉ Email..."
          />
          {typingEmail ? typing : null}
        </View>

        <Text style={[styles.title, {marginTop: 50}]}>Mật khẩu</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onFocus={() => focusInput('password')}
            placeholder="Nhập mật khẩu..."
          />
          {typingPassword ? typing : null}
        </View>
        <TouchableOpacity onPress={pressLogin}>
          <View style={styles.buttonContainer}>
            <View style={styles.animation}>
              <Text style={styles.textLogin}>Đăng nhập</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;

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
});
