import {SET_AUTH_LOADING, SET_CURRENT_USER, USER_LOGIN_FAILED} from "../actions/auth";

export default function auth(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                authedUser: action.user,
                loading: false
            }
        case USER_LOGIN_FAILED:
            return {
                reason: action.reason,
                loading: false
            }
        case SET_AUTH_LOADING:
            return {
                loading: action.loading
            }
        default:
            return state;
    }
}