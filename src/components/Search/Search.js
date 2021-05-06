import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RenderProduct from '../common/RenderProduct';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fetchSearch} from './../../actions/actions';
import {useSelector, useDispatch} from 'react-redux';

const Search = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const products = useSelector(state => state.searchReducer.searchs);
  const [keyword, setKeyword] = useState('');
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const info = {
      type: 'SEARCH',
      keyword,
    };
    dispatch(fetchSearch(info));
  }, [keyword]);

  const searchChange = search => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setKeyword(search);
    }, 300);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.boxSearch}>
        <View style={styles.searchContent}>
          <TextInput
            style={styles.keyWord}
            onChangeText={search => searchChange(search)}
            placeholder="Nhập từ khóa để tìm kiếm..."
          />
          <TouchableOpacity style={styles.btnSearch}>
            <FontAwesome name={'search'} size={20} color={'#a8a8a8'} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <RenderProduct
            style={styles.productComponent}
            products={products}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  productComponent: {
    marginTop: 40,
  },
  btnSearch: {
    marginRight: 4,
  },
  keyWord: {
    width: '80%',
  },
  searchContent: {
    paddingHorizontal: 14,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 40,
  },
  boxSearch: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 46,
  },
});
