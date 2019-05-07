import { combineReducers } from 'redux';
import googleVisionReducer from './googleVisionReducer';
import dbReducer from './dbReducer';

const rootReducer = combineReducers({
  googleVision: googleVisionReducer,
  database: dbReducer,
});

export default rootReducer;
