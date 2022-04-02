import * as React from 'react';

import { connect } from 'react-redux';
import { Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';

import { retrieveAllUsers } from '../actions/users';

const Leaderboard = ({users, retrieveAllUsers}) => {

    React.useEffect(() => {
        retrieveAllUsers();
    }, []);

    const columns = [{
        name: 'name',
        label: 'name'
    }, {
        name: 'answeredQuestions',
        label: 'answered questions'
    }, {
        name: 'askedQuestions',
        label: 'asked questions'
    }];
    
    return (<Container>
        <h2>Leaderboard</h2>
        <MUIDataTable
            title={'Leaderboard'}
            columns={columns}
            data={users}/>
    </Container>);
};

const mapStateToProps = ({users}) => ({
    users: users?.users ?? []
});

const mapDispatchToProps = (dispatch) => ({
    retrieveAllUsers: async () => dispatch(await retrieveAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);