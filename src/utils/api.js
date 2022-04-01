import {_getQuestions, _getUsers, _saveQuestion} from "./_DATA";
import _get from "@babel/runtime/helpers/esm/get";

export async function retrieveUsers() {
    try {
        return await _getUsers();
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
        await _saveQuestion(question);
    } catch (exception) {
        throw exception;
    }
}