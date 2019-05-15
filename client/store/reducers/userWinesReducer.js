import axios from 'axios';

import myIPaddress from '../../../IPaddress';

//action types
const GETTING_WINES = 'GETTING_WINES';
const GOT_WINES = 'GOT_WINES';
const SAVE_WINE = 'SAVE_WINE';
const FILTER_WINES = 'FILTER_WINES';
const RATE_WINE = 'RATE_WINE';

//action creators
export const gettingWines = () => ({
  type: GETTING_WINES,
});

export const gotWines = wines => ({
  type: GOT_WINES,
  wines,
});

const savedWine = wines => ({
  type: SAVE_WINE,
  wines,
});

export const filterWines = filter => ({
  type: FILTER_WINES,
  filter,
});

const ratedWine = wine => ({
  type: RATE_WINE,
  wine,
});

//thunks
export const fetchingWinesFromDb = userId => async dispatch => {
  try {
    dispatch(gettingWines());
    const { data } = await axios.get(
      `http://${myIPaddress.IP}:8080/api/wine/saved/${userId}`
    );
    dispatch(gotWines(data));
  } catch (error) {
    console.error(error);
  }
};

export const saveWineToDb = (wineId, userId) => async dispatch => {
  try {
    const { data } = await axios.post(
      `http://${myIPaddress.IP}:8080/api/wine/saved/${wineId}`,
      { wineId, userId }
    );
    dispatch(savedWine(data));
  } catch (error) {
    console.error(error);
  }
};

export const rateWineInDb = (wineId, rating) => async dispatch => {
  try {
    const { data } = await axios.put(
      `http://${myIPaddress.IP}:8080/api/wine/rating/${wineId}`,
      { rating }
    );
    dispatch(ratedWine(data));
  } catch (error) {
    console.error(error);
  }
};

//initial state
const initialState = {
  loading: false,
  savedWines: {},
  filteredWines: {},
  activeButton: 'all',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_WINES:
      return { ...state, loading: true };
    case GOT_WINES:
      return {
        ...state,
        savedWines: action.wines,
        filteredWines: action.wines,
        loading: false,
        activeButton: 'all',
      };
    case FILTER_WINES:
      const wines = state.savedWines.wines.filter(
        wine => action.filter == wine.savedWine.like
      );
      if (action.filter === 'all') {
        return {
          ...state,
          filteredWines: state.savedWines,
          activeButton: 'all',
        };
      } else if (action.filter === true) {
        return {
          ...state,
          filteredWines: { ...state.savedWines, wines: wines },
          activeButton: 'true',
        };
      } else {
        return {
          ...state,
          filteredWines: { ...state.savedWines, wines: wines },
          activeButton: 'false',
        };
      }
    case SAVE_WINE:
      return {
        ...state,
        savedWines: action.wines,
        filteredWines: action.wines,
        activeButton: 'all',
      };
    case RATE_WINE:
      let updatedWines = [];
      state.savedWines.wines.map(wine => {
        if (action.wine.wines[0].id === wine.id) {
          updatedWines.push(action.wine.wines[0]);
        } else {
          updatedWines.push(wine);
        }
      });
      return {
        ...state,
        savedWines: { ...state.savedWines, wines: updatedWines },
        filteredWines: { ...state.savedWines, wines: updatedWines },
        activeButton: 'all',
      };
    default:
      return state;
  }
};
