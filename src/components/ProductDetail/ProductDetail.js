import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {renderRating} from './../../utils/common';
import avatar from './../../../assets/img/avatars/avatar.png';

import * as Config from './../../Config/config';
import {inserCart, fetchReview} from './../../actions/actions';
import {useSelector, useDispatch} from 'react-redux';

const {height, width} = Dimensions.get('window');
const productWidth = width - 200;
const productHeight = productWidth * 1.25;
import ModalView from './../common/ModalView';

const listTab = [
  {
    name: 'Tất cả đánh giá',
    status: 'ALL_COMMENT',
  },
];

const ProductDetail = props => {
  const {navigation, route} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('ALL_COMMENT');
  const dispatch = useDispatch();
  const signIn = useSelector(state => state.authenReducer.signIn);
  const reviews = useSelector(state => state.reviewReducer.reviews);
  const product = route.params;

  useEffect(() => {
    dispatch(fetchReview(product.productID));
  }, [dispatch]);

  if (signIn) {
    const index = listTab.findIndex(tabl => tabl.status === 'YOUR_COMMENT');
    if (index === -1) {
      listTab.push({name: 'Đánh giá của bạn', status: 'YOUR_COMMENT'});
    }
  }

  const YourComment = () => {
    return <Text>Your commetn</Text>;
  };

  const insertCarts = () => {
    if (signIn) {
      dispatch(inserCart(product.productID));
    } else {
      setModalVisible(!modalVisible);
    }
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  const AllComment = () => {
    return (
      <View style={styles.allComment}>
        {reviews.map((review, key) => (
          <View style={styles.boxComment} key={key}>
            <View style={styles.boxAvatar}>
              <Image
                style={styles.avatarIcon}
                source={{
                  uri: `${URL}/avatars/${review.userImage}`,
                }}
              />
            </View>
            <View style={styles.boxContentComment}>
              <Text style={styles.nameUser}> {review.userFullName}</Text>
              <View>
                <Text style={styles.contentComment}>{review.comment}</Text>
              </View>
              <View style={styles.starTime}>
                <View style={styles.productStar}>
                  {renderRating(review.star)}
                </View>
                <Text style={styles.time}> {review.timeReview}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ModalView modalVisible={modalVisible} handleModal={handleModal} />
      <ScrollView>
        <View style={styles.boxImage}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.pop()}>
            <FontAwesome5 name={'angle-left'} size={28} color={'#003FFF'} />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: `${URL}/products/${product.productImage}`,
            }}
          />
        </View>

        <View style={styles.boxDetail}>
          <View style={styles.contentInfo}>
            <View style={styles.existProduct}>
              {product.productQuantity > 0 ? (
                <>
                  <Text style={styles.exist}>Còn hàng</Text>
                  <FontAwesome5 name={'check'} size={14} color={'green'} />
                </>
              ) : (
                <Text style={styles.exist}>Hết hàng</Text>
              )}
            </View>
            <Text style={styles.productName}>{product.productName}</Text>
            <TouchableOpacity style={styles.boxPrice}>
              <FontAwesome5 name={'dollar-sign'} size={16} color={'#003FFF'} />
              <Text style={styles.productPrice}>
                {product.productPrice} VND
              </Text>
            </TouchableOpacity>
            <View style={styles.starView}>
              <View style={styles.productStar}>{renderRating(3)}</View>
              <View style={styles.productView}>
                <Text style={styles.productViewText}>
                  {product.productView}
                </Text>
                <FontAwesome5 name={'eye'} size={18} color={'grey'} />
              </View>
            </View>
            <Text style={styles.productBrand}>
              Thương hiệu: {product.brandName}
            </Text>
            <Text style={styles.productDesc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              velit omnis laborum ducimus, aperiam, ab sequi aspernatur Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Ipsam velit
              omnis laborum ducimus, aperiam, ab sequi aspernatur
            </Text>
          </View>
        </View>
        <View style={styles.boxReview}>
          <Text style={styles.titleReview}>Đánh giá</Text>
          <View style={styles.listTab}>
            {listTab.map((itemTab, key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.tabItem,
                  status === itemTab.status && styles.tabItemActive,
                ]}
                onPress={() => setStatus(itemTab.status)}>
                <Text
                  style={[
                    styles.textTabItem,
                    status === itemTab.status && styles.textActive,
                  ]}>
                  {itemTab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style-={styles.reviewContent}>
            {status === 'ALL_COMMENT' ? <AllComment /> : <YourComment />}
          </View>
        </View>
      </ScrollView>

      {product.productQuantity > 0 ? (
        <TouchableOpacity style={styles.btnAddCart} onPress={insertCarts}>
          <Text style={styles.textAddCart}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.btnAddCart}>
          <Text style={[styles.textAddCart, styles.textAddCartDisable]}>
            Thêm vào giỏ hàng
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  titleReview: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  time: {
    color: '#616161',
  },
  nameUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentComment: {
    flexShrink: 1,
    color: '#616161',
  },
  boxContentComment: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  boxAvatar: {
    alignItems: 'center',
    padding: 6,
  },
  avatarIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  boxComment: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    width: '100%',
    marginBottom: 14,
  },
  allComment: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  textTabItem: {
    color: '#000',
    marginHorizontal: 10,
  },
  textActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabItemActive: {
    marginHorizontal: 10,
    backgroundColor: '#003FFF',
  },
  tabItem: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  listTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  boxReview: {
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    paddingBottom: 80,
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  boxImage: {
    paddingTop: 24,
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 0.05,
    elevation: 1.5,
  },
  backIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    top: 20,
    left: 20,
  },
  boxDetail: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    marginBottom: 0,
    width: productWidth,
    height: productHeight,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  contentInfo: {
    paddingVertical: 14,
    paddingLeft: 14,
  },

  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  boxPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    marginTop: 2,
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productBrand: {
    marginTop: 4,
    fontSize: 15,
    color: '#8a8a8a',
  },
  productDesc: {
    marginTop: 4,
    fontSize: 16,
    color: '#8a8a8a',
  },
  exist: {
    marginTop: 4,
    marginRight: 4,
    fontSize: 15,
    color: '#003FFF',
  },
  starView: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  starTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productView: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  productViewText: {
    marginRight: 4,
    fontSize: 14,
  },
  existProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnAddCart: {
    borderTopWidth: 1.1,
    borderColor: '#e8e9ed',
    position: 'absolute',
    paddingHorizontal: 24,
    paddingVertical: 6,
    backgroundColor: '#fff',
    width: '100%',
    bottom: 0,
  },
  textAddCart: {
    textAlign: 'center',
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#003FFF',
    borderRadius: 18,
    textTransform: 'uppercase',
  },
  textAddCartDisable: {
    backgroundColor: '#ccc',
  },
});
