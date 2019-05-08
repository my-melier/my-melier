import { combineReducers } from 'redux';
import googleVisionReducer from './googleVisionReducer';
import dbReducer from './dbReducer';
import comparisonReducer from './comparisonReducer';

const rootReducer = combineReducers({
  googleVision: googleVisionReducer,
  database: dbReducer,
  comparisons: comparisonReducer,
});

export default rootReducer;
