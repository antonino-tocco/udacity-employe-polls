import {
    SAVE_QUESTION_ERROR,
    SAVED_QUESTION,
    SET_NAVIGATION_SELECTED_QUESTION,
    SET_QUESTIONS,
    SET_SELECTED_QUESTION, SET_SELECTED_QUESTION_NOT_FOUND
} from '../actions/questions';

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
        case SET_NAVIGATION_SELECTED_QUESTION:
            return {
                navigationSelectedQuestion: action.question
            }
        case SET_SELECTED_QUESTION_NOT_FOUND:
            return {
                selectedQuestionNotFound: true
            }
        case SAVED_QUESTION:
            return {
                savedQuestion: action.savedQuestion
            }
        case SAVE_QUESTION_ERROR:
            return {
                saveQuestionError: action.saveQuestionError
            }
        default:
            return state;
    }
}