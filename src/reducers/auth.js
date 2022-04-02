import {SET_CURRENT_USER, USER_LOGIN_FAILED} from "../actions/auth";

export default function auth(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                authedUser: action.user
            }
        case USER_LOGIN_FAILED:
            return {
                reason: action.reason
            }
        default:
            return state;
    }
}