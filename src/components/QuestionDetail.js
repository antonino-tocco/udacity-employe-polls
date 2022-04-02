import * as React from 'react';

import { connect } from 'react-redux';
import {useParams} from 'react-router';

import {Container, Grid, Typography, Button, Box} from '@mui/material';
import {handleRetrieveQuestionDetail} from '../actions/questions';
import {handleSaveQuestionAnswer} from "../actions/answers";

const QuestionDetail = ({authedUser, question, handleRetrieveQuestionDetail, handleSaveQuestionAnswer}) => {

    const params = useParams();

    const _saveQuestionAnswer = (option) => {
        handleSaveQuestionAnswer(authedUser?.id, question?.id, option);
    }

    React.useEffect(() => {

        const id = params.question_id;
        handleRetrieveQuestionDetail(id);
    }, []);

    return (<Container>
        <Typography textAlign='center'>
            {question?.authorDetail?.name}
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'horizontal', justifyContent: 'center'}}>
            <img src={question?.authorDetail?.avatarURL}/>
        </Box>
        <Typography textAlign='center'>
            Would You Rather
        </Typography>
        <Grid container>
            <Grid item xs={6} sx={{textAlign: 'center'}}>
                <Button variant='outlined' onClick={() => _saveQuestionAnswer('optionOne')}>
                    {question?.optionOne?.text}
                </Button>
            </Grid>
            <Grid item xs={6} sx={{textAlign: 'center'}}>
                <Button variant='outlined' onClick={() => _saveQuestionAnswer('optionTwo')}>
                    {question?.optionTwo?.text}
                </Button>
            </Grid>
        </Grid>
    </Container>);
}

const mapStateToProps = ({questions, auth}) => ({
    question: questions.selectedQuestion,
    authedUser: auth.authedUser ?? null
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