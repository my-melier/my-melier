import axios from 'axios';

//action types
const GETTING_WINES = 'GETTING_WINES';
const GOT_WINES = 'GOT_WINES';
const CONFIRMED_WINE = 'CONFIRMED_WINE';

//action creators
export const gettingWines = () => ({
  type: GETTING_WINES,
});

export const gotWines = wines => ({
  type: GOT_WINES,
  wines,
});

export const confirmedWine = wine => ({
  type: CONFIRMED_WINE,
  wine,
});

//thunks
export const fetchingWinesFromDb = googleResFormatted => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://172.16.25.122:8080/api/wine/${googleResFormatted}`
    );
    dispatch(gotWines(data));
  } catch (error) {
    console.error(error);
  }
};

//initial state
const initialState = {
  loading: false,
  results: [],
  confirmedWine: {},
};

//reducer

export default (dbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_WINES:
      return { ...state, loading: true };
    case GOT_WINES:
      return { ...state, results: action.wines, loading: false };
    case CONFIRMED_WINE:
      return { ...state, confirmedWine: action.wine };
  }
});
