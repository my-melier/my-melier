import axios from 'axios';

import myIPaddress from '../../../IPaddress';

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
export const fetchingWinesFromDb = user => async dispatch => {
  try {
    dispatch(gettingWines());
    const { data } = await axios.get(
      `http://${myIPaddress.IP}:8080/api/wine/${user.id}`
    );
    dispatch(gotWines(data));
  } catch (error) {
    console.error(error);
  }
};

//initial state
const initialState = {
  loading: false,
  wines: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_WINES:
      return { ...state, loading: true };
    case GOT_WINES:
      return {
        ...state,
        wines: action.wines,
        loading: false,
      };
    default:
      return state;
  }
};
