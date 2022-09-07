import { combineReducers } from 'redux';
import {
    userReducer
} from './reducers/users/userReducer';

export const rootReducer = combineReducers({
    ...userReducer,
});

export default rootReducer;
