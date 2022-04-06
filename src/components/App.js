import * as React from 'react';
import {connect} from 'react-redux';

import {Box, CircularProgress, ThemeProvider} from '@mui/material';
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

import pollIcon from '../assets/images/polling.png';
import styled from "styled-components";

const WelcomeIcon = styled.img({
    width: 200,
    height: 200,
    display: 'block',
    margin: '0 auto'
})


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
    refreshAuthedUser,
})  => {

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        refreshAuthedUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!authLoading) {
            setLoading(false);
        }
    }, [authLoading]);


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
                <Box sx={{ display: 'flex', height: '100vh', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <WelcomeIcon src={pollIcon}/>
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
