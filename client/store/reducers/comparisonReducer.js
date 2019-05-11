//action types
const ADDED_TO_COMPARISONS = 'ADDED_TO_COMPARISONS';
const SELECTED_WINE = 'SELECTED_WINE';

//action creators
export const addedToComparisons = wine => ({
  type: ADDED_TO_COMPARISONS,
  wine,
});

export const selectedWine = wine => ({
  type: SELECTED_WINE,
  wine,
});

//thunks

//initial state
const initialState = {
  comparisons: [],
  selectedWine: {},
};

//reducer
export default (comparisonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDED_TO_COMPARISONS:
      return {
        ...state,
        comparisons: [action.wine, ...state.comparisons],
      };
    case SELECTED_WINE:
      return { ...state, selectedWine: action.wine };
    default:
      return state;
  }
});
