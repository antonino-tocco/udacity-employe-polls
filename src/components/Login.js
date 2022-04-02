import * as React from 'react';
import {connect} from 'react-redux';

import {useNavigate} from 'react-router';

import {
    Button,
    Container,
    FormGroup,
    Paper,
    TextField
} from '@mui/material';

import styled from 'styled-components';

import {handleLoginUser} from '../actions/auth';

const PaddedDiv = styled.div({
    padding: '40px 20px'
})

const Login = ({loggedUser, handleUserLogin}) => {

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const navigate = useNavigate();

    const handleSubmit = () => {
        handleUserLogin(username, password);
    }

    React.useEffect(() => {
        if (!!loggedUser) {
            navigate('/');
        }
    }, [loggedUser]);

    return (<Container>
        <h2>Login</h2>
        <Paper>
            <PaddedDiv>
                <FormGroup>
                    <TextField
                        variant='standard'
                        defaultValue={username}
                        onChange={(event) => setUsername(event.target.value)}
                        hint={'Username'}
                        helperText={'Username'}/>
                </FormGroup>
                <FormGroup>
                    <TextField
                        variant='standard'
                        defaultValue={password}
                        onChange={(event) => setPassword(event.target.value)}
                        hint={'Password'}
                        helperText={'Password'}/>
                </FormGroup>
                <Button type='submit' variant='contained' onClick={handleSubmit}>Login</Button>
            </PaddedDiv>
        </Paper>
    </Container>);
}

const mapStateToProps = state => ({
    loggedUser: state.users.loggedUser
});

const mapDispatchToProps = (dispatch) => ({
    handleUserLogin: async (username, password) => dispatch(await handleLoginUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);