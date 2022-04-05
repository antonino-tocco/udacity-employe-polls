import * as React from 'react';
import {connect} from 'react-redux';

import {useNavigate} from 'react-router';

import {
    Container,
    MenuItem,
    Paper, Select, Typography,
} from '@mui/material';

import styled from 'styled-components';
import pollIcon from '../assets/images/polling.png';

import {handleLoginUser} from '../actions/auth';
import {retrieveAllUsers} from "../actions/users";

const PaddedDiv = styled.div({
    padding: '40px 20px'
});

const LoginIcon = styled.img({
    width: 200,
    display: 'block',
    margin: '0 auto'
})

const Login = ({authedUser, allUsers, handleUserLogin, retrieveAllUsers}) => {

    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = React.useState('');

    const handleSubmit = () => {
        const user = allUsers[selectedUser];
        handleUserLogin(user?.id, user?.password);
    }

    const _selectUser = (user) => {
        setSelectedUser(user);
    }

    React.useEffect(() => {
        retrieveAllUsers(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!!selectedUser) {
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUser]);

    React.useEffect(() => {
        if (!!authedUser) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authedUser]);

    return (<Container>
        <h2>Login</h2>
        <Paper>
            <PaddedDiv>
                <LoginIcon src={pollIcon} />
                <Typography>Select user to impersonate</Typography>
                <Select
                    fullWidth={true}
                    label='Select user to impersonate'
                    value={selectedUser ?? ''}
                    onChange={(event) => _selectUser(event.target.value)}>
                    <MenuItem key='' value={''}>Select a user</MenuItem>
                    {!!allUsers ? Object.keys(allUsers)?.map((item) => {
                        const user = allUsers[item];
                        return (<MenuItem key={user?.id}
                                  value={user?.id}>
                            {user?.name} ({user?.id})
                        </MenuItem>);
                        }
                    ) : null}
                </Select>
                {/*<FormGroup>*/}
                {/*    <TextField*/}
                {/*        variant='standard'*/}
                {/*        defaultValue={username}*/}
                {/*        onChange={(event) => setUsername(event.target.value)}*/}
                {/*        hint={'Username'}*/}
                {/*        helperText={'Username'}/>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*    <TextField*/}
                {/*        variant='standard'*/}
                {/*        defaultValue={password}*/}
                {/*        onChange={(event) => setPassword(event.target.value)}*/}
                {/*        hint={'Password'}*/}
                {/*        helperText={'Password'}/>*/}
                {/*</FormGroup>*/}
                {/*<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>*/}
                {/*    <Button type='submit' variant='contained' onClick={handleSubmit}>Login</Button>*/}
                {/*</Box>*/}
            </PaddedDiv>
        </Paper>
    </Container>);
}

const mapStateToProps = ({auth, users}) => ({
    authedUser: auth.authedUser,
    allUsers: users?.extendedUsers
});

const mapDispatchToProps = (dispatch) => ({
    handleUserLogin: async (username, password) => dispatch(await handleLoginUser(username, password)),
    retrieveAllUsers: async(mapping) => dispatch(await retrieveAllUsers(mapping))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);