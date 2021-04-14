import AsyncStorage from '@react-native-async-storage/async-storage';

export default removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
    return true;
  } catch (err) {
    return false;
  }
};
