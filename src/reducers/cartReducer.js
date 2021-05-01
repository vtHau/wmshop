import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  carts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_CART': {
      state.carts = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
