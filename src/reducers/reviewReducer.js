import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  reviews: [],
  yourReviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_REVIEW': {
      state.reviews = action.payload;
      return {
        ...state,
      };
    }

    case 'INIT_YOUR_REVIEW': {
      state.yourReviews = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reviewReducer;
