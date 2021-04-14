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
import Feather from 'react-native-vector-icons/Feather';

import {signInRequest} from './../../actions/actions';

function Login(props) {
  const {width} = Dimensions.get('screen');
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [exactEmail, setExactEmail] = useState(false);
  const [typingEmail, setTypingEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [exactPassword, setExactPassword] = useState(false);
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
      style={{marginRight: 25, marginTop: 20}}
    />
  );

  const emailChange = email => {
    setEmail(email.trim());

    if (email.length !== 0) {
      setExactEmail(true);
    } else {
      setExactEmail(false);
    }
  };

  const passwordChange = password => {
    setPassword(password.trim());

    if (password.length !== 0) {
      setExactPassword(true);
    } else {
      setExactPassword(false);
    }
  };

  const exactIcon = (
    <Feather
      style={{marginTop: 20, marginLeft: 5}}
      name="check-circle"
      color="green"
      size={20}
    />
  );

  const pressLogin = () => {
    setTypingEmail(false);
    setTypingPassword(false);

    if (exactEmail && exactPassword) {
      const dataLogin = {
        email,
        password,
      };

      if (dispatch(signInRequest(dataLogin))) {
        console.log('thanh cong');
      } else {
        console.log('that bai');
      }
    }
    useEffect(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require('./../../../assets/img/header.png')}
          style={styles.imageBackground}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
            Xin chào !!!
          </Text>
          <Text style={{color: 'yellow', fontWeight: 'bold'}}>
            Đăng nhập để tiếp tục
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Email</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onFocus={() => focusInput('email')}
            onChangeText={email => emailChange(email)}
            placeholder="Nhập địa chỉ Email..."
          />
          {typingEmail ? typing : null}
          {exactEmail ? exactIcon : null}
        </View>

        <Text style={[styles.title, {marginTop: 50}]}>Mật khẩu</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onFocus={() => focusInput('password')}
            onChangeText={password => passwordChange(password)}
            placeholder="Nhập mật khẩu..."
          />
          {typingPassword ? typing : null}
          {exactPassword ? exactIcon : null}
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
