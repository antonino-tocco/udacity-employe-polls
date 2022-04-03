import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from './_DATA';

import errors from './errors';

export class ApiError extends Error {
    constructor(errorCode, errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
    }
}

export async function retrieveUsers() {
    try {
        return await _getUsers();
    } catch (exception) {
        throw exception;
    }
}

export async function retrieveUser(id) {
    try {
        const users = await _getUsers();
        return users[id] ?? null;
    } catch (exception) {
        throw exception;
    }
}

export async function loginUser(username, password) {
    try {
        const user = retrieveUser(username);
        if (!user) {
            throw new ApiError(errors.USER_NOT_FOUND, 'User not found');
        }
        if (user?.password !== password) {
            throw new ApiError(errors.PASSWORD_NOT_MATCH, 'Password don\'t match');
        }
        return user;
    } catch (exception) {
        throw exception;
    }
}

export async function retrieveQuestions() {
    try {
        return await _getQuestions();
    } catch (exception) {
        throw exception;
    }
}

export async function retrieveQuestion(id) {
    try {
        const questions = await _getQuestions();
        if (!!questions && !!questions[id]) {
            return questions[id];
        }
        throw new ApiError(errors.QUESTION_NOT_FOUND, 'Question not found');
    } catch (exception) {
        throw exception;
    }
}

export async function saveQuestion(question) {
    try {
        return await _saveQuestion(question);
    } catch (exception) {
        throw exception;
    }
}

export async function saveQuestionAnswer({authedUser, qid, answer}) {
    try {
        return await _saveQuestionAnswer({authedUser, qid, answer});
    } catch (exception) {
        throw exception;
    }
}