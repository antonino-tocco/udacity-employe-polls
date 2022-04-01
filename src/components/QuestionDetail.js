import * as React from 'react';

import { connect } from 'react-redux';
import {Container, Grid, Typography, Button} from '@mui/material';
import {handleRetrieveQuestionDetail} from '../actions/questions';
import {useParams} from 'react-router';

const QuestionDetail = ({question, handleRetrieveQuestionDetail}) => {

    const params = useParams();

    React.useEffect(() => {

        const id = params.question_id;
        handleRetrieveQuestionDetail(id);
    }, []);

    return (<Container>
        <Typography textAlign='center'>
            {question?.author}
        </Typography>
        <Typography textAlign='center'>
            Would You Rather
        </Typography>
        <Grid container>
            <Grid item xs={6} sx={{textAlign: 'center'}}>
                <Button variant='outlined'>
                    {question?.optionOne?.text}
                </Button>
            </Grid>
            <Grid item xs={6} sx={{textAlign: 'center'}}>
                <Button variant='outlined'>
                    {question?.optionTwo?.text}
                </Button>
            </Grid>
        </Grid>
    </Container>);
}

const mapStateToProps = ({questions}) => ({
    question: questions.selectedQuestion,
});

const mapDispatchToProps = (dispatch) => ({
    handleRetrieveQuestionDetail: async (id) => dispatch(await handleRetrieveQuestionDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);