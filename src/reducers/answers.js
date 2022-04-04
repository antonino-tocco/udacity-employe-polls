import {SAVE_QUESTION_ANSWER_ERROR, SAVED_QUESTION_ANSWER} from '../actions/answers';

export default function answers(state = {}, action) {
    switch (action.type) {
        case SAVED_QUESTION_ANSWER:
            return {
                savedQuestionAnswer: action.savedQuestionAnswer
            }
        case SAVE_QUESTION_ANSWER_ERROR:
            return {
                savedQuestionAnswerError: action.savedQuestionAnswerError
            }
        default:
            return state;
    }
}