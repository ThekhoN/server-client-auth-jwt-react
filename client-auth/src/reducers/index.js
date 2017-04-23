import {combineReducers} from 'redux';
import {auth} from './auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: auth,
  form: formReducer
});

export default rootReducer;
