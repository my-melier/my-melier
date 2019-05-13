// action types
const SET_IMAGE = 'SET_IMAGE';
const LOADING = 'LOADING';
const GOT_GOOGLE_REPSONSE = 'GOT_GOOGLE_RESPONSE';

// action creators
export const setImage = image => ({
  type: SET_IMAGE,
  image,
});

export const loading = () => ({
  type: LOADING,
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

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return { ...state, image: action.image };
    case LOADING:
      return { ...state, loading: true };
    case GOT_GOOGLE_REPSONSE:
      return {
        ...state,
        response: action.response.responses[0].fullTextAnnotation.text.slice(
          0,
          -1
        ),
        loading: false,
      };

    default:
      return state;
  }
};
