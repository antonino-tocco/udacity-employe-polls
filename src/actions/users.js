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
                return {
                    name: user?.name,
                    username: user?.id,
                    answeredQuestions: Object.keys(user?.answers)?.length,
                    askedQuestions: user?.questions?.length
                }});
            dispatch(setUserList(mappedUsers));
        } catch (exception) {

        }
    }
}

