import writeStorage from './../utils/writeStorage';
import removeStorage from './../utils/removeStorage';

const initialState = {
  weathers: {
    dt: '',
    wind: '',
    main: {
      temp: '',
      humidity: '',
    },
    sys: {
      sunrise: '',
      sunset: '',
    },
  },
  weatherFiveDay: [],
  uv: '',
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_WEATHER': {
      state.weathers = action.payload;
      return {
        ...state,
      };
    }

    case 'INIT_WEATHER_FIVE_DAY': {
      state.weatherFiveDay = action.payload;
      return {
        ...state,
      };
    }

    case 'INIT_UV': {
      state.uv = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default weatherReducer;
