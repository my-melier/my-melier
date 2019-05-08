//action types
const ADDING_TO_COMPARISONS = 'ADDING_TO_COMPARISONS';
const ADDED_TO_COMPARISONS = 'ADDED_TO_COMPARISONS';
const SELECTED_WINE = 'SELECTED_WINE';

//action creators
// export const addingToComparisons = () => ({
//   type: ADDING_TO_COMPARISONS,
// });

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
  //   loading: false,
  comparisons: [],
  selectedWine: {},
};

//reducer
export default (comparisonReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADDING_TO_COMPARISONS:
    //   return { ...state, loading: true };
    case ADDED_TO_COMPARISONS:
      return {
        ...state,
        comparisons: [...state.comparisons, action.wine],
        // loading: false,
      };
    case SELECTED_WINE:
      return { ...state, selectedWine: action.wine };
    default:
      return state;
  }
});
