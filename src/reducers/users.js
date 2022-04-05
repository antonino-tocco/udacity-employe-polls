import {SET_EXTENDED_USER_LIST, SET_USER_LIST} from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case SET_USER_LIST:
            return {
                users: action.users
            }
        case SET_EXTENDED_USER_LIST:
            return {
                extendedUsers: action.users
            }
        default:
            return state;
    }
}