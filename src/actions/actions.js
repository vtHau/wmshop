import CallAPI from './../utils/CallAPI';
import * as Config from './../Config/config';
import readStorage from './../utils/readStorage';
import removeStorage from './../utils//removeStorage';

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

export const fetchHotProduct = () => {
  return dispatch => {
    CallAPI(`${Config.API_PRODUCT}hot`, 'GET', null).then(res => {
      dispatch(initProduct(res.data));
    });
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

export const fetchOrderHistory = userID => {
  return async dispatch => {
    CallAPI(Config.API_ORDER_HISTORY, 'POST', {userID})
      .then(res => {
        if (typeof res.data !== 'string' && typeof res.data === 'object') {
          dispatch(initOrderHistory(res.data));
        }
      })
      .catch(() => {
        console.log('Error fetch orderHistory');
      });
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

export const fetchSearch = keyword => {
  return dispatch => {
    if (keyword !== '') {
      CallAPI(`${Config.API_PRODUCT}search&keyword=${keyword}`, 'GET', null)
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
