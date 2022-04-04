import * as React from 'react';
import {connect} from 'react-redux';

import {Box, CircularProgress, Container, ThemeProvider} from '@mui/material';
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

import NotFound from "./NotFound";


const routes = [{
    key: 'dashboard',
    label: 'Home',
    path: '/',
    private: true,
    showInMenu: true,
    builder: (props) => <Dashboard {...props} />
}, {
    key: 'leaderboard',
    label: 'Leaderboard',
    path: '/leaderboard',
    private: true,
    showInMenu: true,
    builder: (props) => <Leaderboard {...props} />
}, {
    key: 'question',
    label: 'Question',
    path: '/questions/:question_id',
    private: true,
    showInMenu: false,
    builder: (props) => <QuestionDetail {...props} />
}, {
    key: 'new_question',
    label: 'New',
    path: '/add',
    private: true,
    showInMenu: true,
    builder: (props) => <QuestionCreation {...props} />
}, {
    key: 'login',
    label: 'Login',
    path: '/login',
    private: false,
    showInMenu: false,
    builder: (props) => <Login {...props} />
}, {
    key: 'not_found',
    label: 'Not found',
    path: '/404',
    private: false,
    showInMenu: false,
    builder: (props) => <NotFound {...props}/>
}]

const App = ({
    isUserLogged,
    authedUser,
    authLoading,
    savedQuestion,
    savedQuestionAnswer,
    refreshAuthedUser,
})  => {

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        refreshAuthedUser();
    }, []);

    React.useEffect(() => {
        if (!authLoading) {
            setLoading(false);
        }
    }, [authLoading]);

    React.useEffect(() => {
        if (!!savedQuestionAnswer || !!savedQuestion) {
            refreshAuthedUser();
        }
    }, [savedQuestionAnswer, savedQuestion])

    return (
        <ThemeProvider theme={theme}>
            {!loading ?
            <Router>
                <NavHeader
                    isUserLogged={isUserLogged} authedUser={authedUser}
                    pages={routes?.filter((item) => !!item.showInMenu)}/>
                <Routes>
                    {routes?.map((item) => (
                            item?.private ?
                                <Route key={item?.key}
                                    path={item?.path} element={<PrivateRoute
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
            </Router> :
                <Box sx={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'horizontal', justifyContent: 'center', alignContent: 'center' }}>
                    <CircularProgress />
                </Box>}
        </ThemeProvider>
    );
}

const mapStateToProps = ({auth, questions, answers}) => ({
    isUserLogged: !!auth?.authedUser,
    authedUser: auth?.authedUser,
    authLoading: auth?.loading ?? true,
    savedQuestion: questions.savedQuestion,
    savedQuestionAnswer: answers.savedQuestionAnswer
})

const mapDispatchToProps = (dispatch) => ({
    refreshAuthedUser: async () => dispatch(await retrieveAuthedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
