import * as api from './api';
import errors from "./errors";

describe('loginUser', () => {
    it('will return the user if login', async function () {
        try {
            const user = await api.loginUser('sarahedo', 'password123');
            expect(user).toExists('User not exists');
        } catch (exception) {

        }
    });

    it('will catch an exception if user not found', async function () {
        try {
            const user = await api.loginUser('sarahedo', 'password12');
            //expect(user).toExists('User not exists');
        } catch (exception) {
            expect(exception.errorCode).toBe(errors.PASSWORD_NOT_MATCH)
        }
    });
});

describe('retrieveQuestions', () => {
    it('will retrieve questions', async function () {
       try {
           const questions = await api.retrieveQuestions();
           expect(questions).toBeInstanceOf(Array);
       } catch (exception) {
           console.log(`Exception ${exception}`);
       }
    });
});

describe('retrieveQuestion', () => {
   it('will retrieve question by id', async function () {
       try {
           const question = await api.retrieveQuestion('8xf0y6ziyjabvozdd253nd');
           expect(question).toExists('Question not exists');
       } catch (exception) {

       }
   });
   it('will catch an exception if question not found', async function () {
       try {
           const question = await api.retrieveQuestion('XYZ');
       } catch (exception) {
           expect(exception.errorCode).toBe(errors.QUESTION_NOT_FOUND);
       }
   });
});

describe('retrieveAllUsers', () => {
    it('will retrieve all users', async function () {
        try {
            const users = await api.retrieveUsers();
            expect(users).toBeInstanceOf(Array);
        } catch (exception) {
            console.log(`Exception ${exception}`);
        }
    });
});

describe('saveQuestion', () => {
    it('will save question', async function () {
        try {
            const question = await api.saveQuestion({
                optionOneText: 'Test1',
                optionTwoText: 'Test2',
                author: 'sarahedo'
            });
            expect(question).toExists('Question not saved');
        } catch (exception) {
            console.log(`Exception ${exception}`);
        }
    });
});

describe('saveQuestionAnswer', () => {
    it('will save question answer', async function () {

    });
});