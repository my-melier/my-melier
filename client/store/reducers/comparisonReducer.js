//action types
const ADDED_TO_COMPARISONS = 'ADDED_TO_COMPARISONS';
const SELECTED_WINE = 'SELECTED_WINE';
const REMOVED_WINE = 'REMOVED_WINE';
const CLEARED_COMPARISONS = 'CLEARED_COMPARISONS';

//action creators
export const addedToComparisons = wine => ({
  type: ADDED_TO_COMPARISONS,
  wine,
});

export const selectedWine = wine => ({
  type: SELECTED_WINE,
  wine,
});

export const removedWine = wineId => ({
  type: REMOVED_WINE,
  wineId,
});

export const clearedComparisons = () => ({
  type: CLEARED_COMPARISONS,
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
    case REMOVED_WINE:
      return {
        ...state,
        comparisons: state.comparisons.filter(
          wine => wine.id !== action.wineId
        ),
      };
    case CLEARED_COMPARISONS:
      return { ...state, comparisons: [] };
    default:
      return state;
  }
});
