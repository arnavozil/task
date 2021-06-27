import { combineReducers } from 'redux';
import { commonReducer } from './commonReducer';

const rootReducer = combineReducers({

    // AUTH
    statusReducer: commonReducer('CHECK_STATUS'),
    loginReducer: commonReducer('LOGIN_USER'),
    registerReducer: commonReducer('CREATE_USER'),
    logoutReducer: commonReducer('LOGOUT_USER'),

    //TODO
    addTodoReducer: commonReducer('ADD_TODO'),
    getTodosReducer: commonReducer('GET_TODOS')
});

export default rootReducer;