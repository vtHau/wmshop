import writeStorage from '../utils/writeStorage';
import removeStorage from '../utils/removeStorage';

const initialState = {
  orderHistorys: [],
};

const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_ORDER_HISTORY': {
      state.orderHistorys = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default orderHistoryReducer;
