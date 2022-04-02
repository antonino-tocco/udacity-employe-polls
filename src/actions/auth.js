import {retrieveUsers} from '../utils/api';
import storage from '../utils/storage';

export const USER_LOGGED = 'USER_LOGGED';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export function userLogged(user) {
    const toStoreUser = {...user};
    delete toStoreUser['password'];
    storage.setItem('user_logged', JSON.stringify(toStoreUser));
    return {
        type: USER_LOGGED,
        id: user.id
    }
}

export function userLoginFailed(reason) {
    return {
        type: USER_LOGIN_FAILED,
        reason
    }
}

export async function retrieveLoggedUser() {
    return async (dispatch) => {
        const storedUser = JSON.parse(storage.getItem('user_logged'));
        try {
            const users = await retrieveUsers();
            const user = users[storedUser?.id];
            if (!user) {
                dispatch(userLogged(user));
            }
        } catch (exception) {

        }
    }
}

export async function handleLoginUser(id, password) {
    return async (dispatch, getState) => {
        try {
            const users = await retrieveUsers();
            const user = users[id];
            //TODO ADD LOGIN FAILED REASON
            if (!user) {
                dispatch(userLoginFailed());
                return;
            }
            if (user.id !== id) {
                dispatch(userLoginFailed());
                return;
            }
            if (user.password !== password) {
                dispatch(userLoginFailed());
                return;
            }
            dispatch(userLogged(user));
        } catch (exception) {
            dispatch(userLoginFailed(exception));
        }
    }
}