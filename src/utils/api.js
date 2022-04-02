import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from './_DATA';

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
        return null;
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
        await _saveQuestionAnswer({authedUser, qid, answer});
    } catch (exception) {
        throw exception;
    }
}