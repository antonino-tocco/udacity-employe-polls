import {USER_LOGGED, USER_LOGIN_FAILED} from "../actions/auth";

export default function auth(state = {}, action) {
    switch (action.type) {
        case USER_LOGGED:
            return {
                loggedUser: action.id
            }
        case USER_LOGIN_FAILED:
            return {
                reason: action.reason
            }
        default:
            return state;
    }
}