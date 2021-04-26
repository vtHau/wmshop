// import writeStorage from './../utils/writeStorage';
// import removeStorage from './../utils/removeStorage';

const initialState = {
  hotProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_PRODUCT': {
      state.hotProducts = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default productReducer;
