import * as React from 'react';

import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {Box, Container, Grid, Switch} from '@mui/material';

import {handleRetrieveQuestions, handleGoToQuestionDetail} from '../actions/questions';
import QuestionCard from './elements/QuestionCard';

const questionTypes = {
    ANSWERED: 'answered',
    NOT_ANSWERED: 'not_answered'
}

const Dashboard = ({
    authedUser,
    questions,
    answeredQuestionIds,
    handleRetrieveQuestions,
    handleGoToQuestionDetail,
}) => {

    const navigate = useNavigate();

    const [selectedQuestionsType, setSelectedQuestionsType] = React.useState(questionTypes.NOT_ANSWERED);


    React.useEffect(() => {
        handleRetrieveQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authedUser]);

    const _toggleQuestionsType = () => {
        setSelectedQuestionsType(selectedQuestionsType === questionTypes.ANSWERED ? questionTypes.NOT_ANSWERED : questionTypes.ANSWERED)
    }

    const goToQuestionDetail = (question) => {
        handleGoToQuestionDetail(question);
        navigate(`questions/${question.id}`);
    }


    const unansweredQuestions = (Object.keys(questions ?? []))
        .filter((item) => !answeredQuestionIds?.includes(item))?.map(item => questions[item])
        .sort((x, y) => y.timestamp - x.timestamp);
    const answeredQuestions = (Object.keys(questions ?? []))
        .filter((item) => answeredQuestionIds?.includes(item))?.map(item => questions[item])
        .sort((x, y) => y.timestamp - x.timestamp);

    return (<Container>
        <h2>Dashboard</h2>

        <Box>
            Change showed questions
            <Switch onChange={(event) => _toggleQuestionsType()}/>
        </Box>
        {selectedQuestionsType === questionTypes?.ANSWERED ?
            <Box>
                <h3>Done</h3>
                <Grid container spacing={2}>
                    {answeredQuestions.map((item) => (
                        <Grid key={item.id} item xs={4}>
                            <QuestionCard
                                goToDetail={goToQuestionDetail}
                                question={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box> :
            <Box>
                <h3>New Questions</h3>
                <Grid container spacing={2}>
                    {unansweredQuestions.map((item) => (
                        <Grid key={item.id} item xs={4}>
                            <QuestionCard
                                goToDetail={goToQuestionDetail}
                                question={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        }

    </Container>);
}



const mapStateToProps = ({auth, questions}) => ({
    authedUser: auth?.authedUser ?? null,
    questions: questions?.questions ?? [],
    answeredQuestionIds: questions?.answeredQuestionIds,
});

const mapDispatchToProps = (dispatch) => ({
    handleRetrieveQuestions: async () => dispatch(await handleRetrieveQuestions()),
    handleGoToQuestionDetail: (question) => dispatch(handleGoToQuestionDetail(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);