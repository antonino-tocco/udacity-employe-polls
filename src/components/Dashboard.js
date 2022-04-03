import * as React from 'react';

import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {Card, CardHeader, Container, Grid} from '@mui/material';

import {handleRetrieveQuestions} from '../actions/questions';
import QuestionCard from './elements/QuestionCard';

const Dashboard = ({
    authedUser,
    questions,
    answeredQuestionIds,
    handleRetrieveQuestions
}) => {

    const navigate = useNavigate();

    React.useEffect(() => {
        handleRetrieveQuestions();
    }, [authedUser]);


    const unansweredQuestions = (Object.keys(questions ?? []))
        .filter((item) => !answeredQuestionIds?.includes(item))?.map(item => questions[item]);
    const answeredQuestions = (Object.keys(questions ?? []))
        .filter((item) => answeredQuestionIds?.includes(item))?.map(item => questions[item]);

    return (<Container>
        <h2>Dashboard</h2>
        <h3>New Questions</h3>
        <Grid container spacing={2}>
            {unansweredQuestions.map((item) => (
                <Grid key={item.id}  item xs={4}>
                    <QuestionCard
                        navigate={navigate}
                        question={item}/>
                </Grid>
            ))}
        </Grid>
        <h3>Done</h3>
        <Grid container spacing={2}>
            {answeredQuestions.map((item) => (
                <Grid key={item.id} item xs={4}>
                    <QuestionCard
                        navigate={navigate}
                        question={item}/>
                </Grid>
            ))}
        </Grid>
    </Container>);
}



const mapStateToProps = ({auth, questions}) => ({
    authedUser: auth?.authedUser ?? null,
    questions: questions?.questions ?? [],
    answeredQuestionIds: questions?.answeredQuestionIds,
});

const mapDispatchToProps = (dispatch) => ({
    handleRetrieveQuestions: async () => dispatch(await handleRetrieveQuestions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);