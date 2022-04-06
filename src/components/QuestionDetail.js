import * as React from 'react';

import {connect} from 'react-redux';
import {useParams} from 'react-router';


import {Container, Grid, Typography, Button, Box, styled, Alert, CircularProgress} from '@mui/material';
import {handleRetrieveQuestionDetail} from '../actions/questions';
import {handleSaveQuestionAnswer} from "../actions/answers";
import {retrieveAllUsers} from "../actions/users";
import {handleLogout} from "../actions/auth";

const SelectedButton = styled(Button)({
    background: '#1976d2',
    color: '#fff',
    fontSize: 11,
    '&:hover': {
        background: '#fff',
        color: '#1976d2'
    }
});

const PaddedBox = styled(Box)({
    padding: '20px'
});

const QuestionDetail = ({
                            authedUser,
                            question,
                            users,
                            navigationSelectedQuestion,
                            selectedQuestionNotFound,
                            savedQuestionAnswer,
                            saveQuestionAnswerError,
                            handleLogout,
                            handleRetrieveQuestionDetail,
                            handleSaveQuestionAnswer,
                            retrieveAllUsers
                        }) => {

    const params = useParams();

    const [loading, setLoading] = React.useState(true);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const _saveQuestionAnswer = (option) => {
        handleSaveQuestionAnswer(authedUser?.id, question?.id, option);
    }

    const _evaluateTotalVotes = () => {
        return users?.length || 0;
    }

    const _evaluateOptionVotes = (option) => {
        return option?.votes?.length || 0;
    }

    const _evaluateVotePercentage = (question, option) => {
        const totalVotes = _evaluateTotalVotes() || 1;
        const optionVotes = _evaluateOptionVotes(option) || 0;
        return ((optionVotes / totalVotes) * 100).toFixed(2);
    }

    const votesLabel = (question, option) => {
        const value = option?.votes?.length || 0;
        if (value === 0) {
            return `${value} Vote`;
        }
        return `${_evaluateOptionVotes(option)} Votes (${_evaluateVotePercentage(question, option)}%)`;
    }

    React.useEffect(() => {
        retrieveAllUsers(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!!selectedQuestionNotFound) {
            //setLoading(false);
            handleLogout({
                redirectTo: '/404'
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedQuestionNotFound]);


    React.useEffect(() => {
        if (!!question) {
            setLoading(false);
        }
    }, [question]);

    React.useEffect(() => {
        if (!!savedQuestionAnswer) {
            const qid = savedQuestionAnswer.split('-')[0];
            if (qid === question?.id) {
                handleRetrieveQuestionDetail(qid);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedQuestionAnswer]);

    React.useEffect(() => {
        if (!!saveQuestionAnswerError) {
            setErrorMessage(saveQuestionAnswerError);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }, [saveQuestionAnswerError]);

    React.useEffect(() => {
        const id = params.question_id;
        handleRetrieveQuestionDetail(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _renderButton = (option, optionValue) => {
        const isQuestionAnswered = !!authedUser?.answers[question?.id];
        return option?.votes?.includes(authedUser?.id) ?
            <Box>
                <SelectedButton
                    variant='outlined'
                    onClick={() => _saveQuestionAnswer(optionValue)}>
                    {option?.text}
                </SelectedButton>
                <br/>
                {votesLabel(question, option)}
            </Box> :
            <Box>
                <Button
                    style={{fontSize: 11}}
                    disabled={isQuestionAnswered}
                    variant='outlined'
                    onClick={() => _saveQuestionAnswer(optionValue)}>
                    {option?.text}
                </Button>
                <br/>
                {votesLabel(question, option)}
            </Box>
    };


    return loading ?

        <Box sx={{
            display: 'flex',
            height: '100vh',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress/>
        </Box> :
        <Container>
            <PaddedBox>
                <Typography textAlign='center'>
                    {question?.authorDetail?.name}
                </Typography>
            </PaddedBox>
            {!!question?.authorDetail?.avatarURL ?
                <PaddedBox sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <img alt='avatar-url' src={question?.authorDetail?.avatarURL} style={{maxWidth: 200}}/>
                </PaddedBox> : null
            }
            <PaddedBox>
                <Typography textAlign='center'>
                    Would You Rather
                </Typography>
            </PaddedBox>
            <PaddedBox>
                <Grid container>
                    <Grid item xs={6} sx={{textAlign: 'center'}}>
                        {
                            _renderButton(question?.optionOne, 'optionOne')
                        }
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: 'center'}}>
                        {
                            _renderButton(question?.optionTwo, 'optionTwo')
                        }
                    </Grid>
                </Grid>
            </PaddedBox>
            <PaddedBox>
                {showSuccess ?
                    <Alert severity="success">Answer saved successfully!</Alert> : null
                }
                {errorMessage ?
                    <Alert severity="error">{errorMessage}</Alert> : null
                }
            </PaddedBox>
        </Container>
}

const mapStateToProps = ({users, questions, auth, answers}) => ({
    users: users.users ?? [],
    question: questions.selectedQuestion,
    navigationSelectedQuestion: questions.navigationSelectedQuestion,
    selectedQuestionNotFound: questions?.selectedQuestionNotFound,
    authedUser: auth.authedUser ?? null,
    savedQuestionAnswer: answers.savedQuestionAnswer ?? null,
    saveQuestionAnswerError: answers?.saveQuestionAnswerError
});

const mapDispatchToProps = (dispatch) => ({
    handleRetrieveQuestionDetail: async (id) => dispatch(await handleRetrieveQuestionDetail(id)),
    handleSaveQuestionAnswer: async (authedUser, qid, answer) => dispatch(await handleSaveQuestionAnswer({
        authedUser,
        qid,
        answer
    })),
    handleLogout: async ({redirectTo}) => dispatch(await handleLogout({
        redirectTo
    })),
    retrieveAllUsers: async (mapping) => dispatch(await retrieveAllUsers(mapping))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);