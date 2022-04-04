import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Provider} from "react-redux";
import QuestionCreation from './QuestionCreation';
import store from '../store';

describe('QuestionCreation', () => {
   it('will return an error because author not present', () => {
       const view = render(<Provider store={store}>
           <QuestionCreation />
       </Provider>);
       const optionOneInput = view.getByTestId('option-one');
       const optionTwoInput = view.getByTestId('option-two');
       const submitButton = view.getByTestId('submit');
       fireEvent.change(optionOneInput, {target: {value: 'Test1'}});
       fireEvent.change(optionTwoInput, {target: {value: 'Test2'}});
       fireEvent.click(submitButton);
       setTimeout(() => {
           expect(view.getByTestId('error-alert')).toBeInTheDocument();
           expect(view.getByTestId('success-alert')).not.toBeInTheDocument();
       }, 1000);
   });
});