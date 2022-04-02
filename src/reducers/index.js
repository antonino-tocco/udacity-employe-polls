import {combineReducers} from 'redux';

import auth from './auth';
import users from './users';
import questions from './questions';
import answers from './answers';

export default combineReducers({
    auth,
    users,
    questions,
    answers
})