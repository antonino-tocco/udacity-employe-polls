import md5 from 'crypto-js/md5';
import {retrieveUsers} from '../utils/api';

export const SET_USER_LIST = 'SET_USER_LIST';

export function setUserList(users) {
    return {
        type: SET_USER_LIST,
        users
    }
}

export async function retrieveAllUsers() {
    return async (dispatch) => {
        const users = await retrieveUsers();
        try {
            const mappedUsers = Object.keys(users)?.map((item) => {
                const user = users[item];
                const avatarURL = `https://www.gravatar.com/avatar/${md5(JSON.stringify(user))}`;
                return {
                    id: user?.id,
                    name: user?.name,
                    username: user?.id,
                    avatarURL: avatarURL,
                    answeredQuestions: Object.keys(user?.answers)?.length,
                    askedQuestions: user?.questions?.length
                }});
            dispatch(setUserList(mappedUsers));
        } catch (exception) {

        }
    }
}

