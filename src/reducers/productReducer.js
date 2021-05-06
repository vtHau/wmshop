import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  hotProducts: [],
  brandProducts: [],
  catProducts: [],
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_HOT_PRODUCT': {
      state.hotProducts = action.payload;
      return {
        ...state,
      };
    }

    case 'INIT_BRAND_PRODUCT': {
      state.brandProducts = action.payload;
      return {
        ...state,
      };
    }

    case 'INIT_CAT_PRODUCT': {
      state.catProducts = action.payload;
      return {
        ...state,
      };
    }

    case 'INIT_PRODUCT': {
      state.products = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default productReducer;
