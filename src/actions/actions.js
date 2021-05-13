import CallAPI from './../utils/CallAPI';
import * as Config from './../Config/config';
import readStorage from './../utils/readStorage';
import removeStorage from './../utils//removeStorage';
import axios from 'axios';

export const signInRequest = dataLogin => {
  return dispatch => {
    CallAPI(Config.API_SIGNUP, 'POST', {...dataLogin})
      .then(res => {
        if (typeof res.data !== 'string') {
          dispatch(signIn(res.data));
        }
      })
      .catch(() => {
        console.log('Error sigin via email and password');
      });
  };
};

export const signInToken = () => {
  return async dispatch => {
    const resp = await readStorage('signIn');
    if (resp && resp !== null) {
      const {token} = resp;
      CallAPI(Config.API_SIGNIN_TOKEN, 'POST', {token})
        .then(res => {
          if (typeof res.data !== 'string' && typeof res.data === 'object') {
            dispatch(signIn(res.data));
          }
        })
        .catch(() => {
          console.log('Error sigin via token');
        });
    }
  };
};

export const signIn = info => {
  return {
    type: 'SIGN_IN',
    payload: info,
  };
};

export const signOut = () => {
  console.log('da chay');
  return {
    type: 'SIGN_OUT',
  };
};

export const fetchCategory = () => {
  return dispatch => {
    CallAPI(Config.API_CATE, 'GET', null).then(res => {
      dispatch(initCate(res.data));
    });
  };
};

export const initCate = cates => {
  return {
    type: 'INIT_CATE',
    payload: cates,
  };
};

export const fetchBrand = () => {
  return dispatch => {
    CallAPI(Config.API_BRAND, 'GET', null).then(res => {
      dispatch(initBrand(res.data));
    });
  };
};

export const initBrand = brands => {
  return {
    type: 'INIT_BRAND',
    payload: brands,
  };
};

export const fetchReview = productID => {
  return dispatch => {
    const review = {
      type: 'GET_REVIEW',
      productID,
    };
    CallAPI(Config.API_REVIEW, 'POST', review).then(res => {
      if (typeof res.data !== 'string' && typeof res.data === 'object') {
        dispatch(initReview(res.data));
      } else if (
        typeof res.data === 'string' &&
        res.data.trim() === 'NOT_FOUND_REVIEW'
      ) {
        dispatch(initReview([]));
      }
    });
  };
};

export const fetchYourReview = productID => {
  return async dispatch => {
    const resp = await readStorage('signIn');
    if (resp && resp !== null) {
      const {userID} = resp.userInfo;
      const review = {
        type: 'GET_YOUR_REVIEW',
        userID,
        productID,
      };

      CallAPI(Config.API_REVIEW, 'POST', review)
        .then(res => {
          if (typeof res.data !== 'string' && typeof res.data === 'object') {
            dispatch(initYourReview(res.data));
          } else if (
            typeof res.data === 'string' &&
            res.data.trim() === 'NOT_FOUND_YOUR_REVIEW'
          ) {
            dispatch(initYourReview([]));
          }
        })
        .catch(() => {
          console.log('Error insert cart');
        });
    }
  };
};

export const updateYourReview = async review => {
  const resp = await readStorage('signIn');
  if (resp && resp !== null) {
    const {userID} = resp.userInfo;
    const {comment, star, productID} = review;
    const reviews = {
      type: 'UPDATE_YOUR_REVIEW',
      userID,
      productID,
      comment,
      star,
    };

    const res = await CallAPI(Config.API_REVIEW, 'POST', reviews);

    if (
      typeof res.data === 'string' &&
      res.data.trim() === 'UPDATE_YOUR_REVIEW_SUCCESS'
    ) {
      return true;
    }
    return false;
  }
};

export const newYourReview = async review => {
  const resp = await readStorage('signIn');
  if (resp && resp !== null) {
    const {userID} = resp.userInfo;
    const {comment, star, productID} = review;
    const reviews = {
      type: 'NEW_YOUR_REVIEW',
      userID,
      productID,
      comment,
      star,
    };

    const res = await CallAPI(Config.API_REVIEW, 'POST', reviews);

    if (
      typeof res.data === 'string' &&
      res.data.trim() === 'NEW_YOUR_REVIEW_SUCCESS'
    ) {
      return true;
    }
    return false;
  }
};

export const deleteYourComment = async productID => {
  const resp = await readStorage('signIn');
  if (resp && resp !== null) {
    const {userID} = resp.userInfo;
    const reviews = {
      type: 'DELETE_YOUR_REVIEW',
      userID,
      productID,
    };

    const res = await CallAPI(Config.API_REVIEW, 'POST', reviews);

    if (
      typeof res.data === 'string' &&
      res.data.trim() === 'DELETE_YOUR_REVIEW_SUCCESS'
    ) {
      return true;
    }
    return false;
  }
};

export const initReview = reviews => {
  return {
    type: 'INIT_REVIEW',
    payload: reviews,
  };
};

export const initYourReview = reviews => {
  return {
    type: 'INIT_YOUR_REVIEW',
    payload: reviews,
  };
};

export const updateCartQuantity = (cartID, quantity) => {
  return async dispatch => {
    const update = {
      type: 'UPDATE_QUANTITY',
      cartID,
      quantity,
    };
    CallAPI(Config.API_CART_UPDATE, 'POST', update)
      .then(res => {
        if (
          typeof res.data === 'string' &&
          res.data.trim() == 'UPDATE_CART_SUCCESS'
        ) {
          dispatch(fetchCart());
        }
      })
      .catch(() => {
        console.log('Error update cart quantity');
      });
  };
};

export const inserCart = (productID, quantity = 1) => {
  return async dispatch => {
    const resp = await readStorage('signIn');
    if (resp && resp !== null) {
      const {userID} = resp.userInfo;
      const update = {
        type: 'INSERT_CART',
        userID,
        productID,
        quantity,
      };

      CallAPI(Config.API_CART_UPDATE, 'POST', update)
        .then(res => {
          if (
            typeof res.data === 'string' &&
            res.data.trim() == 'INSERT_CART_SUCCESS'
          ) {
            dispatch(fetchCart());
          }
        })
        .catch(() => {
          console.log('Error insert cart');
        });
    }
  };
};

export const deleteCart = cartID => {
  return async dispatch => {
    const update = {
      type: 'DELETE_CART',
      cartID,
    };
    CallAPI(Config.API_CART_UPDATE, 'POST', update)
      .then(async res => {
        if (
          typeof res.data === 'string' &&
          res.data.trim() == 'DELETE_CART_SUCCESS'
        ) {
          await dispatch(fetchCart());
        }
      })
      .catch(() => {
        console.log('Error update cart quantity');
      });
  };
};

export const initCart = carts => {
  return {
    type: 'INIT_CART',
    payload: carts,
  };
};

export const updateViewProduct = productID => {
  const info = {
    type: 'UPDATE_VIEW',
    productID,
  };
  CallAPI(Config.API_PRODUCT, 'POST', info).then(res => {});
};

export const fetchProduct = info => {
  return dispatch => {
    CallAPI(Config.API_PRODUCT, 'POST', info).then(res => {
      if (typeof res.data !== 'string' && typeof res.data === 'object') {
        switch (info.type) {
          case 'HOT':
            dispatch(initHotProduct(res.data));
            break;

          // case 'BRAND':
          //   dispatch(initBrandProduct(res.data));
          //   break;

          // case 'CATE':
          //   dispatch(initCatProduct(res.data));
          //   break;

          default:
            dispatch(initProduct(res.data));
            break;
        }
      } else {
        switch (info.type) {
          case 'HOT':
            dispatch(initHotProduct([]));
            break;

          // case 'BRAND':
          //   dispatch(initBrandProduct([]));
          //   break;

          // case 'CATE':
          //   dispatch(initCatProduct([]));
          // break;

          default:
            dispatch(initProduct([]));

            break;
        }
      }
    });
  };
};

export const initHotProduct = products => {
  return {
    type: 'INIT_HOT_PRODUCT',
    payload: products,
  };
};

export const initBrandProduct = products => {
  return {
    type: 'INIT_BRAND_PRODUCT',
    payload: products,
  };
};

export const initCatProduct = products => {
  return {
    type: 'INIT_CAT_PRODUCT',
    payload: products,
  };
};

export const initProduct = products => {
  return {
    type: 'INIT_PRODUCT',
    payload: products,
  };
};

export const initOrderHistory = orderHistorys => {
  return {
    type: 'INIT_ORDER_HISTORY',
    payload: orderHistorys,
  };
};

export const insertOrderHistory = async () => {
  const resp = await readStorage('signIn');

  if (resp && resp !== null) {
    const {userID} = resp.userInfo;
    const order = {
      type: 'INSERT_ORDER',
      userID,
    };

    const res = await CallAPI(Config.API_ORDER_HISTORY, 'POST', order);
    if (
      typeof res.data === 'string' &&
      res.data.trim() === 'INSERT_ORDER_SUCCESS'
    ) {
      return true;
    } else {
      return false;
    }
  }
};

export const fetchOrderHistory = () => {
  return async dispatch => {
    const resp = await readStorage('signIn');

    if (resp && resp !== null) {
      const {userID} = resp.userInfo;
      const order = {
        type: 'GET_ORDER',
        userID,
      };

      CallAPI(Config.API_ORDER_HISTORY, 'POST', order)
        .then(res => {
          if (typeof res.data !== 'string' && typeof res.data === 'object') {
            dispatch(initOrderHistory(res.data));
          } else {
            dispatch(initOrderHistory([]));
          }
        })
        .catch(() => {
          console.log('Error fetch orderHistory');
        });
    }
  };
};

export const fetchCart = () => {
  return async dispatch => {
    const resp = await readStorage('signIn');
    if (resp && resp !== null) {
      const {userID} = resp.userInfo;

      CallAPI(Config.API_CART, 'POST', {userID})
        .then(res => {
          if (typeof res.data !== 'string' && typeof res.data === 'object') {
            dispatch(initCart(res.data));
          } else if (
            typeof res.data === 'string' &&
            res.data.trim() === 'NOT_FOUND_CART'
          ) {
            dispatch(initCart([]));
          }
        })
        .catch(() => {
          console.log('Error sigin via token');
        });
    }
  };
};

export const fetchSearch = info => {
  return dispatch => {
    if (info.keyword !== '') {
      CallAPI(Config.API_PRODUCT, 'POST', info)
        .then(res => {
          if (typeof res.data !== 'string' && typeof res.data === 'object') {
            dispatch(initSearch(res.data));
          } else {
            dispatch(initSearch([]));
          }
        })
        .catch(() => {
          console.log('Error sigin via token');
        });
    } else {
      dispatch(initSearch([]));
    }
  };
};

export const initSearch = searchs => {
  return {
    type: 'INIT_SEARCH',
    payload: searchs,
  };
};

export const fetchWeatherFiveDay = () => {
  return dispatch => {
    axios({
      method: 'GET',
      url: `${Config.API_WEATHER_FIVE_DAY}Saigon${Config.API_WEATHER_KEY}`,
      data: null,
    })
      .then(resTwo => {
        if (resTwo.data.list !== undefined) {
          dispatch(initWeatherFiveDay(resTwo.data.list));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchWeather = () => {
  return async dispatch => {
    axios({
      method: 'GET',
      url: `${Config.API_WEATHER}Saigon${Config.API_WEATHER_KEY}`,
      data: null,
    })
      .then(resOne => {
        if (resOne.data !== undefined) {
          dispatch(initWeather(resOne.data));

          axios({
            method: 'GET',
            url: 'https://api.openuv.io/api/v1/uv',
            headers: {
              'content-type': 'application/json',
              'x-access-token': '6abf8c1ab048d0cb001e2b3fc3a7d71c',
            },
            params: {
              lat: `${resOne.data.coord.lat}`,
              lng: `${resOne.data.coord.lon}`,
            },
          })
            .then(resThree => {
              dispatch(initUV(resThree.data.result.uv));
            })
            .catch(err => {});
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const initWeather = weathers => {
  return {
    type: 'INIT_WEATHER',
    payload: weathers,
  };
};

export const initWeatherFiveDay = weathers => {
  return {
    type: 'INIT_WEATHER_FIVE_DAY',
    payload: weathers,
  };
};

export const initUV = uv => {
  return {
    type: 'INIT_UV',
    payload: uv,
  };
};

export const updatePassword = async infoPassword => {
  const res = await CallAPI(Config.API_UPDATE_PASSWORD, 'POST', {
    ...infoPassword,
  });
  return res.data.trim();
};

export const updateInfo = async userInfo => {
  const res = await CallAPI(Config.API_UPDATE_INFO, 'POST', {...userInfo});
  return res.data.trim();
};

export const checkSignUp = async signup => {
  const res = await CallAPI('/other/api/signup.php', 'POST', {...signup});
  return res.data.trim();
};

export const checkSignIn = async signin => {
  const res = await CallAPI(Config.API_SIGNIN, 'POST', {...signin});
  if (typeof res.data === 'object') {
    return res.data;
  }
  return 'SIGIN_FAIL';
};
