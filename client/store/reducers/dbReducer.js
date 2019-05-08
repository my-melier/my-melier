import axios from 'axios';

//action types
const GETTING_WINES = 'GETTING_WINES';
const GOT_WINES = 'GOT_WINES';

//action creators
export const gettingWines = () => ({
  type: GETTING_WINES,
});

export const gotWines = wines => ({
  type: GOT_WINES,
  wines,
});

//thunks
export const fetchingWinesFromDb = googleResFormatted => async dispatch => {
  try {
    console.log('FETCH WINE ACTION TOP');
    dispatch(gettingWines());
    const { data } = await axios.get(
      `http://172.16.25.122:8080/api/wine/${googleResFormatted}`
    );
    dispatch(gotWines(data));
    console.log('FETCH WINE ACTION BOTTOM');
  } catch (error) {
    console.error(error);
  }
};

//initial state
const initialState = {
  loading: false,
  results: [],
};

//reducer
export default (dbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_WINES:
      return { ...state, loading: true };
    case GOT_WINES:
      return {
        ...state,
        results: action.wines,
        loading: false,
      };
    default:
      return state;
  }
});
