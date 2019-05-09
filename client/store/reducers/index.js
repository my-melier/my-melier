import { combineReducers } from 'redux';
import googleVisionReducer from './googleVisionReducer';
import queryWinesReducer from './queryWinesReducer';
import comparisonReducer from './comparisonReducer';
import userReducer from './userReducer';
import userWinesReducer from './userWinesReducer';

const rootReducer = combineReducers({
  googleVision: googleVisionReducer,
  database: queryWinesReducer,
  comparisons: comparisonReducer,
  user: userReducer,
  userWines: userWinesReducer,
});

export default rootReducer;
