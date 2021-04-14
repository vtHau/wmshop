import AsyncStorage from '@react-native-async-storage/async-storage';

const writeStorage = async (key, value) => {
  await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
};

export default writeStorage;
