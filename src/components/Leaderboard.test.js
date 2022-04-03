import * as React from 'react';
import { render } from '@testing-library/react';
import {Provider} from "react-redux";

import Leaderboard from './Leaderboard';
import store from '../store';

describe('Leaderboard component', () => {
   it('render Leaderboard', async () => {
      const view = render(<Provider store={store}>
         <Leaderboard />
      </Provider>);
      expect(view).toMatchSnapshot();
   });
});