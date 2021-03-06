import axios from 'axios';
import myIPaddress from '../../../IPaddress';

//action types
const GOT_WINES = 'GOT_WINES';

//action creators
export const gotWines = wines => ({
  type: GOT_WINES,
  wines,
});

//thunks
export const fetchingWinesFromDb = googleResFormatted => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://${myIPaddress.IP}:8080/api/wine/${googleResFormatted}`
    );
    dispatch(gotWines(data));
  } catch (error) {
    console.error(error);
  }
};

//initial state
const initialState = {
  results: [],
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
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
      };
    default:
      return state;
  }
};
