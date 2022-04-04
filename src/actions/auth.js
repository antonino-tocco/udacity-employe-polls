import md5 from 'crypto-js/md5';
import {retrieveUsers} from '../utils/api';
import storage from '../utils/storage';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export function setCurrentUser(user) {
    const toStoreUser = user;
    if (!!toStoreUser) {
        delete toStoreUser['password'];
    }
    storage.setItem('user', JSON.stringify(toStoreUser));

    return {
        type: SET_CURRENT_USER,
        user: toStoreUser
    }
}

export function userLoginFailed(reason) {
    return {
        type: USER_LOGIN_FAILED,
        reason
    }
}

export async function retrieveAuthedUser() {
    return async (dispatch) => {
        const storedUser = JSON.parse(storage.getItem('user'));
        try {
            const users = await retrieveUsers();
            const user = users[storedUser?.id];
            dispatch(setCurrentUser(user));
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

export function handleLogout() {
    return (dispatch) => {
        try {
            storage.removeItem('user');
            dispatch(setCurrentUser(null));
        } catch (exception) {

        }
    }
}