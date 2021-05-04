import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  reviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_REVIEW': {
      state.reviews = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reviewReducer;
