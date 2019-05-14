import axios from 'axios';

import myIPaddress from '../../../IPaddress';

//action types
const GETTING_WINES = 'GETTING_WINES';
const GOT_WINES = 'GOT_WINES';
const SAVE_WINE = 'SAVE_WINE';
const FILTER_WINES = 'FILTER_WINES';

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
      `http://${myIPaddress.IP}:8080/api/wine/saved/${userId}`,
      { wineId, userId }
    );
    dispatch(savedWine(data));
  } catch (error) {
    console.error(error);
  }
};

//initial state
const initialState = {
  loading: false,
  savedWines: {},
  filteredWines: {},
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
      };
    case FILTER_WINES:
      const wines = state.savedWines.wines.filter(
        wine => action.filter == wine.savedWine.like
      );
      if (action.filter === 'all') {
        return {
          ...state,
          filteredWines: state.savedWines,
        };
      } else {
        return {
          ...state,
          filteredWines: { ...state.savedWines, wines: wines },
        };
      }
    case SAVE_WINE:
      return {
        ...state,
        savedWines: action.wines,
        filteredWines: action.wines,
      };
    default:
      return state;
  }
};
