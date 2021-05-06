import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TitleView = props => {
  const {navigation, style, title} = props;

  return (
    <View style={style}>
      <View style={styles.boxTitle}>
        {navigation !== undefined ? (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <FontAwesome5 name={'angle-left'} size={24} color={'#414dd1'} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <Text style={styles.title}>{title}</Text>
        <View></View>
      </View>
    </View>
  );
};

export default TitleView;

const styles = StyleSheet.create({
  boxTitle: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#414dd1',
    fontSize: 18,
  },
});
