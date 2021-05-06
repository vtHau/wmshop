import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import RenderProduct from '../common/RenderProduct';
import {fetchProduct} from './../../actions/actions';
import {useSelector, useDispatch} from 'react-redux';

const ProductList = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const info = route.params;
  const products = useSelector(state => state.productReducer.products);

  useEffect(() => {
    if (info.brandID !== undefined) {
      const brand = {
        type: 'BRAND',
        brandID: info.brandID,
      };
      dispatch(fetchProduct(brand));
    } else if (info.catID !== undefined) {
      const cat = {
        type: 'CATE',
        catID: info.catID,
      };
      dispatch(fetchProduct(cat));
    }
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <RenderProduct products={products} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
