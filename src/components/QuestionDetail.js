import * as React from 'react';

import { connect } from 'react-redux';
import {useParams} from 'react-router';

import {Container, Grid, Typography, Button, Box, styled} from '@mui/material';
import {handleRetrieveQuestionDetail} from '../actions/questions';
import {handleSaveQuestionAnswer} from "../actions/answers";

const SelectedButton = styled(Button)({
    background: '#000',
    color: '#fff'
});

const PaddedBox = styled(Box)({
    padding: '20px'
});

const QuestionDetail = ({authedUser, question, savedQuestionAnswer, handleRetrieveQuestionDetail, handleSaveQuestionAnswer}) => {

    const params = useParams();

    const _saveQuestionAnswer = (option) => {
        handleSaveQuestionAnswer(authedUser?.id, question?.id, option);
    }

    const _renderButton = (option, optionValue) => {
        const isQuestionAnswered = !!authedUser?.answers[question?.id];
        return option?.votes?.includes(authedUser?.id) ?
            <SelectedButton
                variant='outlined'
                onClick={() => _saveQuestionAnswer(optionValue)}>
                {option?.text}
            </SelectedButton>:
            <Button
                disabled={isQuestionAnswered}
                variant='outlined'
                onClick={() => _saveQuestionAnswer(optionValue)}>
                {option?.text}
            </Button>
    };

    React.useEffect(() => {
        const id = params.question_id;
        handleRetrieveQuestionDetail(id);
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

    return (<Container>
        <PaddedBox>
            <Typography textAlign='center'>
                {question?.authorDetail?.name}
            </Typography>
        </PaddedBox>
        {!!question?.authorDetail?.avatarURL ?
            <PaddedBox sx={{display: 'flex', flexDirection: 'horizontal', justifyContent: 'center'}}>
                <img src={question?.authorDetail?.avatarURL}/>
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
    </Container>);
}

const mapStateToProps = ({questions, auth, answers}) => ({
    question: questions.selectedQuestion,
    authedUser: auth.authedUser ?? null,
    savedQuestionAnswer: answers.savedQuestionAnswer ?? null
});

const mapDispatchToProps = (dispatch) => ({
    handleRetrieveQuestionDetail: async (id) => dispatch(await handleRetrieveQuestionDetail(id)),
    handleSaveQuestionAnswer: async(authedUser, qid, answer) => dispatch(await handleSaveQuestionAnswer({
        authedUser,
        qid,
        answer
    }))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);