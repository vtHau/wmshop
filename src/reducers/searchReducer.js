import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  searchs: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_SEARCH': {
      state.searchs = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default searchReducer;
