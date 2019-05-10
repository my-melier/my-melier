import { combineReducers } from 'redux';
import googleVisionReducer from './googleVisionReducer';
import queryWinesReducer from './queryWinesReducer';
import comparisonReducer from './comparisonReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  googleVision: googleVisionReducer,
  database: queryWinesReducer,
  comparisons: comparisonReducer,
  user: userReducer,
});

export default rootReducer;
