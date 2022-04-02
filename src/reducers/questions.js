import {SAVED_QUESTION, SET_QUESTIONS, SET_SELECTED_QUESTION} from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                questions: action.questions,
                answeredQuestionIds: action.answeredQuestionIds
            }
        case SET_SELECTED_QUESTION:
            return {
                selectedQuestion: action.question
            }
        case SAVED_QUESTION:
            return {
                savedQuestion: action.savedQuestion
            }
        default:
            return state;
    }
}