import { combineReducers } from 'redux';
import googleVisionReducer from './googleVisionReducer';

const rootReducer = combineReducers({ googleVision: googleVisionReducer });

export default rootReducer;
