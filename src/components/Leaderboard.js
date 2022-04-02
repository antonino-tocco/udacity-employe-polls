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
        name: 'id',
        label: 'name',
        customBodyRenderLite: (dataIndex, rowIndex) => {
            console.log(dataIndex);
            console.log(rowIndex);
            return null;
        },
        options: {
            sort: false
        }
    }, {
        name: 'answeredQuestions',
        label: 'answered questions'
    }, {
        name: 'askedQuestions',
        label: 'asked questions'
    }];

    const options = {
        customSort: (data, colIndex, order) => data.sort((a, b) => ((a['answeredQuestions'] +  a['askedQuestions']) - (b['answeredQuestions'] + b ['askedQuestions'])))
    }

    const hasUsers = !!users && users.length > 0;
    
    return (<Container>
        <h2>Leaderboard</h2>
        {!!hasUsers &&
            <MUIDataTable
                title={'Leaderboard'}
                options={options}
                columns={columns}
                data={users}/>
        }
    </Container>);
};

const mapStateToProps = ({users}) => ({
    users: users?.users ?? []
});

const mapDispatchToProps = (dispatch) => ({
    retrieveAllUsers: async () => dispatch(await retrieveAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);