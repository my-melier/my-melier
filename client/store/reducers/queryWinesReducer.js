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
    dispatch(gettingWines());
    const { data } = await axios.get(
      `http://172.16.26.6:8080/api/wine/${googleResFormatted}`
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
};

//reducer
export default (queryWinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_WINES:
      return { ...state, loading: true };
    case GOT_WINES:
      let uniqueValues = [];
      let uniqueTitles = [];
      for (let i = 0; i < action.wines.length; i++) {
        if (!uniqueTitles.includes(action.wines[i].title)) {
          uniqueTitles.push(action.wines[i].title);
          uniqueValues.push(action.wines[i]);
        }
      }
      return {
        ...state,
        results: uniqueValues,
        loading: false,
      };
    default:
      return state;
  }
});
