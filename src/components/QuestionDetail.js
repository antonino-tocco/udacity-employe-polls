import * as React from 'react';

import {connect} from 'react-redux';
import {useLocation, useParams, Navigate, useNavigate} from 'react-router';


import {Container, Grid, Typography, Button, Box, styled, Alert} from '@mui/material';
import {handleRetrieveQuestionDetail} from '../actions/questions';
import {handleSaveQuestionAnswer} from "../actions/answers";

const SelectedButton = styled(Button)({
    background: '#1976d2',
    color: '#fff',
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
                            navigationSelectedQuestion,
                            savedQuestionAnswer,
                            saveQuestionAnswerError,
                            handleRetrieveQuestionDetail,
                            handleSaveQuestionAnswer
                        }) => {

    const params = useParams();
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const _saveQuestionAnswer = (option) => {
        handleSaveQuestionAnswer(authedUser?.id, question?.id, option);
    }


    React.useEffect(() => {
        if (!!savedQuestionAnswer) {
            const qid = savedQuestionAnswer.split('-')[0];
            if (qid === question?.id) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            }
        }
    }, [savedQuestionAnswer]);

    React.useEffect(() => {
        if (!!saveQuestionAnswerError) {
            setErrorMessage(saveQuestionAnswerError);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }, [saveQuestionAnswerError]);

    const _renderButton = (option, optionValue) => {
        const isQuestionAnswered = !!authedUser?.answers[question?.id];
        return option?.votes?.includes(authedUser?.id) ?
            <SelectedButton
                variant='outlined'
                onClick={() => _saveQuestionAnswer(optionValue)}>
                {option?.text}
            </SelectedButton> :
            <Button
                disabled={isQuestionAnswered}
                variant='outlined'
                onClick={() => _saveQuestionAnswer(optionValue)}>
                {option?.text}
            </Button>
    };

    React.useEffect(() => {
        const id = params.question_id;
        if (id === navigationSelectedQuestion?.id) {
            handleRetrieveQuestionDetail(id);
        } else {
            navigate('/404', {replace: true});
        }
    }, []);

    React.useEffect(() => {
        const id = params.question_id;
        if (!!savedQuestionAnswer) {
            const qid = savedQuestionAnswer.split('-')[0];
            if (qid === id) {
                handleRetrieveQuestionDetail(id);
            }
        }
    }, [savedQuestionAnswer]);

    return (
        <Container>
            <PaddedBox>
                <Typography textAlign='center'>
                    {question?.authorDetail?.name}
                </Typography>
            </PaddedBox>
            {!!question?.authorDetail?.avatarURL ?
                <PaddedBox sx={{display: 'flex', flexDirection: 'horizontal', justifyContent: 'center'}}>
                    <img src={question?.authorDetail?.avatarURL} style={{maxWidth: 200}}/>
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
        </Container>);
}

const mapStateToProps = ({questions, auth, answers}) => ({
    question: questions.selectedQuestion,
    navigationSelectedQuestion: questions.navigationSelectedQuestion,
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
    }))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);