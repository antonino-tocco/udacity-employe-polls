import {SET_USER_LIST} from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case SET_USER_LIST:
            return {
                users: action.users
            }
        default:
            return state;
    }
}