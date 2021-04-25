// import writeStorage from './../utils/writeStorage';
// import removeStorage from './../utils/removeStorage';

const initialState = {
  brands: [],
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BRAND': {
      state.brands = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default brandReducer;
