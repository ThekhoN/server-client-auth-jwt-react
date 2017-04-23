import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));
// const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;
