import {retrieveQuestion, retrieveQuestions} from '../utils/api';

export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_SELECTED_QUESTION = "SET_SELECTED_QUESTION";

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

export async function handleRetrieveQuestions() {
    return async (dispatch, getState) => {
        const { loggedUser } = getState();
        const answeredQuestionIds = !!loggedUser ? Object.keys(loggedUser?.answers ?? []) : [];
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

        } catch (exception) {

        }
    }
}