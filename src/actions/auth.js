import {retrieveUsers} from '../utils/api';
import storage from '../utils/storage';

export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGOUT = 'USER_LOGOUT';

export function setCurrentUser(user) {
    const toStoreUser = user;
    if (!!toStoreUser) {
        delete toStoreUser['password'];
    }
    if (!toStoreUser) {
        storage.removeItem('user');
    } else {
        storage.setItem('user', JSON.stringify(toStoreUser));
    }

    return {
        type: SET_CURRENT_USER,
        user: toStoreUser,
    }
}

export function logout({redirectTo}) {
    return {
        type: USER_LOGOUT,
        redirectTo
    }
}

export function setAuthLoading(value) {
    return {
        type: SET_AUTH_LOADING,
        loading: value
    }
}

export function setLogout(redirectTo= null) {
    return {
        type: USER_LOGOUT,
        redirectTo
    }
}

export function userLoginFailed(reason) {
    return {
        type: USER_LOGIN_FAILED,
        reason,
    }
}

export async function retrieveAuthedUser() {
    return async (dispatch) => {
        dispatch(setAuthLoading(true));
        const jsonItem = storage.getItem('user');
        const storedUser = !!jsonItem ? JSON.parse(storage.getItem('user')) : null;
        try {
            const users = await retrieveUsers();
            const user = users[storedUser?.id]
            if (!!user) {
                dispatch(setCurrentUser(user));
            } else {
                storage.removeItem('user');
                dispatch(setLogout());
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
            dispatch(setCurrentUser(user));
        } catch (exception) {
            dispatch(userLoginFailed(exception));
        }
    }
}

export function handleLogout({
    redirectTo
} = {
    redirectTo: null
}) {
    return (dispatch) => {
        try {
            storage.removeItem('user');
            dispatch(setLogout(redirectTo))
        } catch (exception) {

        }
    }
}