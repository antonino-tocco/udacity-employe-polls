import * as React from 'react';
import { render } from '@testing-library/react';
import QuestionCard from "./QuestionCard";
import * as api from '../../utils/api';


describe('QuestionCard component', () => {
    it('render QuestionCard with question ', async () => {
        const question = await api.retrieveQuestion('8xf0y6ziyjabvozdd253nd');
        const view = render(<QuestionCard question={question}/>);
        expect(view).toMatchSnapshot();
    })
})