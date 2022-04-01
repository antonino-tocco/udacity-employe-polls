import * as React from 'react';

import {connect} from 'react-redux';

import {Card, CardHeader, Container, Grid} from '@mui/material';
import {handleRetrieveQuestions} from '../actions/questions';
import QuestionCard from './elements/QuestionCard';

const Dashboard = ({
    questions,
    answeredQuestionIds,
    handleRetrieveQuestions
}) => {

    React.useEffect(() => {
        handleRetrieveQuestions();
    }, [])


    const unansweredQuestions = (Object.keys(questions ?? []))
        .filter((item) => !answeredQuestionIds?.includes(item))?.map(item => questions[item]);
    const answeredQuestions = (Object.keys(questions ?? []))
        .filter((item) => answeredQuestionIds?.includes(item.id))?.map(item => questions[item]);

    return (<Container>
        <h2>Dashboard</h2>
        <h3>New Questions</h3>
        <Grid container spacing={2}>
            {unansweredQuestions.map((item) => (
                <Grid key={item.id}  item xs={4}>
                    <QuestionCard question={item}/>
                </Grid>
            ))}
        </Grid>
        <h3>Done</h3>
        <Grid container spacing={2}>
            {answeredQuestions.map((item) => (
                <Grid key={item.id} item xs={4}>
                    <QuestionCard question={item}/>
                </Grid>
            ))}
        </Grid>
    </Container>);
}



const mapStateToProps = ({questions}) => ({
    questions: questions?.questions ?? [],
    answeredQuestionIds: questions?.answeredQuestionIds
});

const mapDispatchToProps = (dispatch) => ({
    handleRetrieveQuestions: async () => dispatch(await handleRetrieveQuestions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);