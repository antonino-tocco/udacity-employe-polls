import {SAVED_QUESTION_ANSWER } from '../actions/answers';

export default function answers(state = {}, action) {
    switch (action.type) {
        case SAVED_QUESTION_ANSWER:
            return {
                savedQuestionAnswer: action.savedQuestionAnswer
            }
        default:
            return state;
    }
}