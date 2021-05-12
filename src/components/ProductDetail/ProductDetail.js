import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {
  inserCart,
  fetchReview,
  fetchYourReview,
  updateYourReview,
  deleteYourComment,
  newYourReview,
} from './../../actions/actions';
import {Formik} from 'formik';
import {validateUpdateComment} from '../../utils/validation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {renderRating} from './../../utils/common';
import Rating from './../Rating/Rating';
import * as Config from './../../Config/config';
import ModalView from './../common/ModalView';

const {height, width} = Dimensions.get('window');
const productWidth = width - 200;
const productHeight = productWidth * 1.25;

const listTab = [
  {
    signInR: false,
    name: 'Tất cả đánh giá',
    status: 'ALL_COMMENT',
  },
  {
    signInR: true,
    name: 'Đánh giá của bạn',
    status: 'YOUR_COMMENT',
  },
];

const ProductDetail = props => {
  const {navigation, route} = props;
  const product = route.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('ALL_COMMENT');
  const [editComment, setEditComment] = useState(false);
  const [rating, setRating] = useState(0);
  const signIn = useSelector(state => state.authenReducer.signIn);
  const reviews = useSelector(state => state.reviewReducer.reviews);
  const yourReviews = useSelector(state => state.reviewReducer.yourReviews);
  const URL = `${Config.API_URL}${Config.URL_IMAGE}`;

  useEffect(() => {
    dispatch(fetchReview(product.productID));
  }, [dispatch]);

  useEffect(() => {
    if (status === 'YOUR_COMMENT') {
      dispatch(fetchYourReview(product.productID));
    }
  }, [status]);

  const changeComment = async values => {
    const review = {
      star: rating === 0 ? yourReviews[0].star : rating,
      comment: values.comment,
      productID: product.productID,
    };

    const res = await updateYourReview(review);
    if (res) {
      dispatch(fetchYourReview(product.productID));
      setEditComment(!editComment);
    }
  };

  const deleteComment = async () => {
    const res = await deleteYourComment(product.productID);

    if (res) {
      dispatch(fetchReview(product.productID));
      dispatch(fetchYourReview(product.productID));
    }
  };

  const newReview = async values => {
    const review = {
      star: rating,
      comment: values.comment,
      productID: product.productID,
    };

    const res = await newYourReview(review);
    if (res) {
      dispatch(fetchReview(product.productID));
      dispatch(fetchYourReview(product.productID));
    }
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

  const YourComment = () => {
    return (
      <View style={styles.allComment}>
        {yourReviews.length > 0 &&
          signIn &&
          yourReviews.map((yourReview, key) => (
            <View style={styles.boxComment} key={key}>
              <View style={styles.boxAvatar}>
                <Image
                  style={styles.avatarIcon}
                  source={{
                    uri: `${URL}/avatars/${yourReview.userImage}`,
                  }}
                />
              </View>
              <View style={styles.boxContentComment}>
                <Text style={styles.nameUser}>{yourReview.userFullName}</Text>
                <View>
                  <Text style={styles.contentComment}>
                    {yourReview.comment}
                  </Text>
                </View>
                <View style={styles.starTime}>
                  <View style={styles.productStar}>
                    {renderRating(yourReview.star)}
                  </View>
                  <Text style={styles.time}>{yourReview.timeReview}</Text>
                </View>
              </View>

              <View style={styles.boxFeature}>
                <TouchableOpacity>
                  {Number(yourReview.status) === 1 ? (
                    <FontAwesome
                      style={styles.iconF}
                      name={'check-circle'}
                      size={18}
                      color={'#003FFF'}
                    />
                  ) : (
                    <FontAwesome
                      style={styles.iconF}
                      name={'spinner'}
                      size={18}
                      color={'grey'}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditComment(!editComment);
                    setRating(0);
                  }}>
                  <FontAwesome5 name={'edit'} size={18} color={'#003FFF'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteComment}>
                  <FontAwesome5
                    style={styles.iconF}
                    name={'trash-alt'}
                    size={18}
                    color={'#003FFF'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        {yourReviews.length === 0 && (
          <View>
            <Formik
              initialValues={{
                comment: '',
              }}
              validationSchema={validateUpdateComment}
              onSubmit={values => newReview(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => (
                <>
                  <View style={styles.boxEditComment}>
                    <Text style={styles.titleEditComment}>Thêm đánh giá</Text>
                    <View style={styles.boxEdit}>
                      <View style={styles.selectStar}>
                        <Rating
                          size={18}
                          numStars={5}
                          rating={rating}
                          setRating={setRating}
                        />
                      </View>
                    </View>
                    <View style={styles.infoItem}>
                      <FontAwesome5
                        name={'comment-alt'}
                        size={22}
                        color={'#616161'}
                      />

                      <TextInput
                        style={styles.textInput}
                        onBlur={handleBlur('comment')}
                        onChangeText={handleChange('comment')}
                        value={values.comment}
                        placeholder="Nhập tên của bạn..."
                      />
                    </View>
                    {errors.comment && touched.comment ? (
                      <Text style={styles.errorFill}>{errors.comment}</Text>
                    ) : null}
                    <TouchableOpacity
                      style={styles.btnReview}
                      onPress={() => handleSubmit()}>
                      <Text style={styles.textReview}>Đánh giá</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        )}
        {editComment ? (
          <Formik
            initialValues={{
              comment: yourReviews[0].comment,
            }}
            validationSchema={validateUpdateComment}
            onSubmit={values => changeComment(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <>
                <View style={styles.boxEditComment}>
                  <Text style={styles.titleEditComment}>
                    Chỉnh sửa đánh giá
                  </Text>
                  <View style={styles.boxEdit}>
                    <View style={styles.selectStar}>
                      <Rating
                        size={18}
                        numStars={5}
                        rating={rating > 0 ? rating : yourReviews[0].star}
                        setRating={setRating}
                      />
                    </View>
                  </View>
                  <View style={styles.infoItem}>
                    <FontAwesome5
                      name={'comment-alt'}
                      size={22}
                      color={'#616161'}
                    />

                    <TextInput
                      style={styles.textInput}
                      onBlur={handleBlur('comment')}
                      onChangeText={handleChange('comment')}
                      value={values.comment}
                      placeholder="Nhập tên của bạn..."
                    />
                  </View>
                  {errors.comment && touched.comment ? (
                    <Text style={styles.errorFill}>{errors.comment}</Text>
                  ) : null}
                  <TouchableOpacity
                    style={styles.btnReview}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.textReview}>Đánh giá</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ModalView
        title=" Đăng nhập để thêm vào giỏ hàng"
        modalVisible={modalVisible}
        handleModal={handleModal}
      />
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
            <Text style={styles.productDesc}>{product.productDesc}</Text>
          </View>
        </View>
        <View style={styles.boxReview}>
          <Text style={styles.titleReview}>Đánh giá</Text>
          <View style={styles.listTab}>
            {listTab.map((itemTab, key) => {
              if (itemTab.signInR && signIn) {
                return (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.tabItem,
                      status === itemTab.status && styles.tabItemActive,
                    ]}
                    onPress={() => {
                      setStatus(itemTab.status);
                      dispatch(fetchReview(product.productID));
                      dispatch(fetchYourReview(product.productID));
                    }}>
                    <Text
                      style={[
                        styles.textTabItem,
                        status === itemTab.status && styles.textActive,
                      ]}>
                      {itemTab.name}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (!itemTab.signInR) {
                return (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.tabItem,
                      status === itemTab.status && styles.tabItemActive,
                    ]}
                    onPress={() => {
                      setStatus(itemTab.status);
                      dispatch(fetchReview(product.productID));
                    }}>
                    <Text
                      style={[
                        styles.textTabItem,
                        status === itemTab.status && styles.textActive,
                      ]}>
                      {itemTab.name}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
          <View style-={styles.reviewContent}>
            {status === 'ALL_COMMENT' ? <AllComment /> : null}
            {status === 'YOUR_COMMENT' && signIn ? <YourComment /> : null}
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
  iconF: {
    marginVertical: 4,
  },
  errorFill: {
    marginTop: 4,
    paddingLeft: 10,
    color: 'red',
    fontSize: 14,
  },
  textReview: {
    fontSize: 16,
    marginTop: 14,
    backgroundColor: '#003FFF',
    padding: 10,
    paddingHorizontal: 18,
    borderRadius: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoItem: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F3F3F3',
    borderRadius: 18,
    paddingLeft: 8,
    overflow: 'hidden',
  },
  textInput: {
    width: '85%',
    overflow: 'hidden',
    color: '#414dd1',
    marginLeft: 6,
  },
  boxEditComment: {
    width: '100%',
    alignItems: 'center',
  },
  selectStar: {
    marginTop: 14,
    flexDirection: 'row',
    width: '100%',
  },
  titleEditComment: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxFeature: {
    justifyContent: 'space-around',
    padding: 6,
  },
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
    justifyContent: 'space-around',
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
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: '#e8e9ed',
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
