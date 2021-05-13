import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {checkSignUp} from './../../../actions/actions';
import TitleView from './../../common/TitleView';

const randomCode = () => {
  let code = '';
  for (var i = 0; i < 4; i++) {
    code = code + ' ' + Math.floor(Math.random() * 10);
  }
  return code;
};

const ConfirmCode = props => {
  const {navigation, route} = props;
  const infoUser = route.params;
  const [code, setCode] = useState();
  const [numOne, setNumOne] = useState('');
  const [numTwo, setNumTwo] = useState('');
  const [numThree, setNumThree] = useState('');
  const [numFour, setNumFour] = useState('');
  const [status, setStatus] = useState(false);

  const confirm = async () => {
    const codeInput =
      numOne.toString() +
      numTwo.toString() +
      numThree.toString() +
      numFour.toString();
    if (codeInput === infoUser.code) {
      const resp = await checkSignUp(infoUser);
      if (resp === 'SIGNUP_SUCCESS') {
        setStatus(false);
        navigation.replace('SIGN_IN');
      } else {
        setStatus(true);
      }
    } else {
      setStatus(true);
    }
  };

  return (
    <View style={styles.container}>
      <TitleView title="Xác nhận tài khoản" navigation={navigation} />
      <Text style={styles.title}>
        Vui lòng kiểm tra địa chỉ Email để kích hoạt tài khoản
      </Text>
      <View style={styles.boxContent}>
        <Text style={styles.codeCofirm}>Nhập mã xác nhận</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            color="#414dd1"
            value={numOne}
            onBlur={() => setStatus(false)}
            maxLength={1}
            onChangeText={num => setNumOne(num)}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            color="#414dd1"
            value={numTwo}
            onBlur={() => setStatus(false)}
            maxLength={1}
            onChangeText={num => setNumTwo(num)}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            color="#414dd1"
            value={numThree}
            onBlur={() => setStatus(false)}
            maxLength={1}
            onChangeText={num => setNumThree(num)}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            onBlur={() => setStatus(false)}
            color="#414dd1"
            value={numFour}
            maxLength={1}
            onChangeText={num => setNumFour(num)}
            underlineColorAndroid="transparent"
          />
        </View>
        {status && (
          <Text style={styles.confirmFail}>
            Xác nhận không thành công vui lòng thử lại
          </Text>
        )}

        <TouchableOpacity style={styles.btnConfirm} onPress={() => confirm()}>
          <Text style={styles.textConfirm}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 16,
    color: '#414dd1',
    fontWeight: 'bold',
  },
  boxContent: {
    marginBottom: '60%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxInput: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: 'center',
  },
  codeCofirm: {
    marginTop: 70,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#414dd1',
  },
  btnConfirm: {
    marginTop: 40,
    backgroundColor: '#414dd1',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  textConfirm: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmFail: {
    marginTop: 14,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});
