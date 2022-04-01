import {USER_LOGGED, USER_LOGIN_FAILED} from "../actions/users";

export default function users(state = {}, action) {
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