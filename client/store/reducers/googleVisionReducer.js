// action types
const SET_IMAGE = 'SET_IMAGE';
const LOADING_GOOGLE_RESPONSE = 'LOADING_GOOGLE_RESPONSE';
const GOT_GOOGLE_REPSONSE = 'GOT_GOOGLE_RESPONSE';

// action creators
export const setImage = image => ({
  type: SET_IMAGE,
  image,
});

export const loadingGoogleResponse = () => ({
  type: LOADING_GOOGLE_RESPONSE,
});

export const gotGoogleResponse = response => ({
  type: GOT_GOOGLE_REPSONSE,
  response,
});

// initial state
const initialState = {
  image: null,
  loading: false,
  response: null,
};

export default (googleVisionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return { ...state, image: action.image };
    case LOADING_GOOGLE_RESPONSE:
      return { ...state, loading: true };
    case GOT_GOOGLE_REPSONSE:
      return { ...state, response: action.response, loading: false };
    default:
      return state;
  }
});
