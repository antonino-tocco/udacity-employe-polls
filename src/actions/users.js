import {retrieveQuestions, retrieveUsers} from '../utils/api';

export const SET_USER_LIST = 'SET_USER_LIST';
export const SET_EXTENDED_USER_LIST = 'SET_EXTENDED_USER_LIST';

export function setUserList(users) {
    return {
        type: SET_USER_LIST,
        users
    }
}

export function setExtendedUserList(users) {
    return {
        type: SET_EXTENDED_USER_LIST,
        users
    }
}

export async function retrieveAllUsers(mapping) {
    return async (dispatch) => {
        const users = await retrieveUsers();
        const questions = await retrieveQuestions();
        try {
            if (!mapping) {
                dispatch(setExtendedUserList(users));
                return;
            }
            const mappedUsers = Object.keys(users)?.map((item) => {
                const user = users[item];
                return {
                    id: user?.id,
                    name: user?.name,
                    username: user?.id,
                    avatarURL: user?.avatarURL,
                    answeredQuestions: Object.keys(user?.answers)?.length,
                    askedQuestions: Object.keys(questions).map((item) => questions[item])
                        .reduce((a, b) => {
                            a += b['author'] === user?.id ? 1 : 0;
                            return a;
                        }, 0),
                }});
            dispatch(setUserList(mappedUsers));
        } catch (exception) {
            console.log('@@@@@€xception', exception);
        }
    }
}

