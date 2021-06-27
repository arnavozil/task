import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import masterReducer from '../reducer';

const store = createStore(masterReducer, applyMiddleware(reduxThunk));
export default store;