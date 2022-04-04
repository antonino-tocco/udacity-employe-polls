import * as React from 'react';

import { connect } from 'react-redux';
import {Avatar, Box, Container, Typography, styled} from '@mui/material';
import MUIDataTable from 'mui-datatables';

import { retrieveAllUsers } from '../actions/users';

const SubLabel = styled(Typography)({
    fontSize: 8,
    fontStyle: 'italic'
});

const Leaderboard = ({users, savedQuestion, savedQuestionAnswer, retrieveAllUsers}) => {

    React.useEffect(() => {
        retrieveAllUsers();
    }, []);

    React.useEffect(() => {
        if (!!savedQuestionAnswer || !!savedQuestion) {
            retrieveAllUsers();
        }
    }, [savedQuestionAnswer, savedQuestion])

    const sortedUsers = (users ?? []).sort((a, b) => (b.answeredQuestions + b.askedQuestions) - (a.answeredQuestions + a.answeredQuestions));

    const columns = [{
        name: 'id',
        label: 'Author',
        options: {
            sort: false,
            customBodyRenderLite: (dataIndex, rowIndex) => {
                const user = users[rowIndex];
                return <Box sx={{display: 'flex', flexDirection: 'horizontal', alignItems: 'center'}}>
                    <Avatar src={user?.avatarURL}/>
                    <div style={{marginLeft: 10}}>
                        <Typography>
                            {user?.name}
                        </Typography>
                        <SubLabel>
                            {user?.id}
                        </SubLabel>
                    </div>
                </Box>
            },
        }
    }, {
        name: 'answeredQuestions',
        label: 'Answered questions'
    }, {
        name: 'askedQuestions',
        label: 'Asked questions'
    }];

    const options = {
        sort: true,
        selectableRows: 'none'
    }

    const hasUsers = !!sortedUsers && sortedUsers.length > 0;
    
    return (<Container>
        <h2>Leaderboard</h2>
        {!!hasUsers &&
            <MUIDataTable
                title={'Leaderboard'}
                options={options}
                columns={columns}
                data={sortedUsers}/>
        }
    </Container>);
};

const mapStateToProps = ({users, questions, answers}) => ({
    users: users?.users ?? [],
    savedQuestion: questions.savedQuestion,
    savedQuestionAnswer: answers.savedQuestionAnswer
});

const mapDispatchToProps = (dispatch) => ({
    retrieveAllUsers: async () => dispatch(await retrieveAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);