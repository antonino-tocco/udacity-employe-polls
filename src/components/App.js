import * as React from 'react';
import {connect} from 'react-redux';

import {Container, ThemeProvider} from '@mui/material';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import {retrieveAuthedUser} from '../actions/auth';

import Dashboard from './Dashboard';
import Login from './Login';
import theme from '../theme';
import NavHeader from './NavHeader';
import PrivateRoute from './PrivateRoute';
import Leaderboard from './Leaderboard';
import QuestionDetail from './QuestionDetail';
import QuestionCreation from './QuestionCreation';
import {SAVE_QUESTION_ANSWER} from "../actions/answers";


const routes = [{
    key: 'dashboard',
    label: 'Home',
    path: '/',
    private: false,
    showInMenu: true,
    builder: (props) => <Dashboard {...props} />
}, {
    key: 'leaderboard',
    label: 'Leaderboard',
    path: '/leaderboard',
    private: false,
    showInMenu: true,
    builder: (props) => <Leaderboard {...props} />
}, {
    key: 'questions',
    label: 'Question',
    path: '/questions/:question_id',
    private: false,
    showInMenu: false,
    builder: (props) => <QuestionDetail {...props} />
}, {
    key: 'new_question',
    label: 'New',
    path: '/add',
    private: false,
    showInMenu: true,
    builder: (props) => <QuestionCreation {...props} />
}, {
    key: 'login',
    label: 'Login',
    path: '/login',
    private: false,
    showInMenu: false,
    builder: (props) => <Login {...props} />
}]

const App = ({
    isUserLogged,
    authedUser,
    savedQuestion,
    savedQuestionAnswer,
    refreshAuthedUser,
})  => {

    React.useEffect(() => {
        refreshAuthedUser();
    }, []);


    React.useEffect(() => {
        if (!!savedQuestionAnswer || !!savedQuestion) {
            refreshAuthedUser();
        }
    }, [savedQuestionAnswer, savedQuestion])

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavHeader
                    isUserLogged={isUserLogged} authedUser={authedUser}
                    pages={routes?.filter((item) => !!item.showInMenu)}/>
                <Routes>
                    {routes?.map((item) => (
                            item?.private ?
                                <Route path={item?.path} element={<PrivateRoute
                                        isUserLogged={isUserLogged} authedUser={authedUser}/>}>
                                    <Route key={item?.key}
                                           path={item?.path}
                                           element={item.builder()}/>
                                </Route> :
                                <Route key={item?.key}
                                       path={item?.path}
                                       element={item.builder()}/>
                        )
                    )}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

const mapStateToProps = ({auth, questions, answers}) => ({
    isUserLogged: !!auth?.authedUser,
    authedUser: auth?.authedUser,
    savedQuestion: questions.savedQuestion,
    savedQuestionAnswer: answers.savedQuestionAnswer
})

const mapDispatchToProps = (dispatch) => ({
    refreshAuthedUser: async () => dispatch(await retrieveAuthedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
