import {retrieveQuestion, retrieveQuestions, retrieveUser, saveQuestion} from '../utils/api';

export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_SELECTED_QUESTION = "SET_SELECTED_QUESTION";
export const SET_NAVIGATION_SELECTED_QUESTION = "SET_NAVIGATION_SELECTED_QUESTION"
export const SAVED_QUESTION = "SAVED_QUESTION";
export const SAVE_QUESTION_ERROR = "SAVE_QUESTION_ERROR";


export function setQuestions({questions, answeredQuestionIds}) {
    return {
        type: SET_QUESTIONS,
        questions,
        answeredQuestionIds
    }
}

export function setSelectedQuestion({question}) {
    return {
        type: SET_SELECTED_QUESTION,
        question
    }
}

export function setNavigationSelectedQuestion({question}) {
    return {
        type: SET_NAVIGATION_SELECTED_QUESTION,
        question
    }
}

export async function handleRetrieveQuestions() {
    return async (dispatch, getState) => {
        const { auth } = getState();
        const { authedUser } = auth;
        const updatedUser = await retrieveUser(authedUser?.id);
        const answeredQuestionIds = !!authedUser ? Object.keys(updatedUser?.answers ?? []) : [];
        try {
            const questions = await retrieveQuestions();
            dispatch(setQuestions({
                questions,
                answeredQuestionIds
            }));
        } catch (exception) {

        }
    }
}

export async function handleRetrieveQuestionDetail(id) {
    return async (dispatch) => {
        try {
            const question = await retrieveQuestion(id);
            const author = await retrieveUser(question.author);
            if (!!author) {
                delete author.password;
            }
            question.authorDetail = author;
            dispatch(setSelectedQuestion({
                question
            }));
        } catch (exception) {

        }
    }
}

export async function handleSaveQuestion(question) {
    return async (dispatch) => {
        try {
            const storedQuestion = await saveQuestion(question);
            dispatch({
                type: SAVED_QUESTION,
                savedQuestion: storedQuestion?.id
            });
        } catch (exception) {
            dispatch({
                type: SAVE_QUESTION_ERROR,
                savedQuestion: null,
                saveQuestionError: exception.message
            });
        }
    }
}

export function handleGoToQuestionDetail(question) {
    return (dispatch) => {
        dispatch(setNavigationSelectedQuestion({
            question
        }))
    }
}
