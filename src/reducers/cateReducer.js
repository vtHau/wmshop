import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  cates: [],
};

const cateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_CATE': {
      state.cates = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default cateReducer;
