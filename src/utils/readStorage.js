import AsyncStorage from '@react-native-async-storage/async-storage';

export default readStorage = async key => {
  try {
    const dataStorage = await AsyncStorage.getItem(`@${key}`);
    if (dataStorage !== null) {
      return JSON.parse(dataStorage);
    }
    return null;
  } catch (err) {
    return null;
  }
};
