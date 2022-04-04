import {saveQuestionAnswer} from "../utils/api";

export const SAVED_QUESTION_ANSWER = "SAVED_QUESTION_ANSWER";
export const SAVE_QUESTION_ANSWER_ERROR = "SAVE_QUESTION_ANSWER";

export async function handleSaveQuestionAnswer({authedUser, qid, answer}) {
    return async (dispatch) => {
        try {
            await saveQuestionAnswer({
                authedUser,
                qid,
                answer
            });
            dispatch({
                type: SAVED_QUESTION_ANSWER,
                savedQuestionAnswer: `${qid}-${answer}`
            });
        } catch (exception) {
            dispatch({
                type: SAVE_QUESTION_ANSWER_ERROR,
                saveQuestionAnswerError: exception.message,
                savedQuestionAnswer: null
            })
        }
    }
}