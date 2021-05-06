import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import RenderProduct from '../common/RenderProduct';
import {fetchProduct} from './../../actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import TitleView from './../common/TitleView';

const ProductList = props => {
  const {navigation, route} = props;
  const [titleTop, setTitleTop] = useState('');
  const dispatch = useDispatch();
  const info = route.params;
  const products = useSelector(state => state.productReducer.products);

  useEffect(() => {
    if (info.brandID !== undefined) {
      setTitleTop(info.brandName);

      const brand = {
        type: 'BRAND',
        brandID: info.brandID,
      };
      dispatch(fetchProduct(brand));
    } else if (info.catID !== undefined) {
      setTitleTop(info.catName);

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
        <TitleView title={titleTop} navigation={navigation} />
        <RenderProduct
          style={styles.productView}
          products={products}
          navigation={navigation}
        />
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
  productView: {
    marginTop: 14,
  },
});
