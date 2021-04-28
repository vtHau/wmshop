import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import RenderProduct from '../common/RenderProduct';

const Search = () => {
  const products = [1, 2, 3, 4];
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <RenderProduct products={products} />
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
