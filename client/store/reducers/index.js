import { combineReducers } from 'redux';
import googleVisionReducer from './googleVisionReducer';
import queryWinesReducer from './queryWinesReducer';
import comparisonReducer from './comparisonReducer';

const rootReducer = combineReducers({
  googleVision: googleVisionReducer,
  database: queryWinesReducer,
  comparisons: comparisonReducer,
});

export default rootReducer;
