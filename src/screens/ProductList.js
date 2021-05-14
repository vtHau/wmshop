import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import RenderProduct from './../components/RenderProduct';
import TitleView from './../components/TitleView';
import {fetchProduct} from './../actions/actions';

const ProductList = props => {
  const {navigation, route} = props;
  const info = route.params;
  const dispatch = useDispatch();
  const [titleTop, setTitleTop] = useState('');

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
