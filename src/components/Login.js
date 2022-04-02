import * as React from 'react';
import {connect} from 'react-redux';

import {useNavigate} from 'react-router';

import {
    Box,
    Button,
    Container,
    FormGroup,
    Paper,
    TextField
} from '@mui/material';

import styled from 'styled-components';
import pollIcon from '../assets/images/polling.png';

import {handleLoginUser} from '../actions/auth';

const PaddedDiv = styled.div({
    padding: '40px 20px'
});

const LoginIcon = styled.img({
    width: 200,
    display: 'block',
    margin: '0 auto'
})

const Login = ({authedUser, handleUserLogin}) => {

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const navigate = useNavigate();

    const handleSubmit = () => {
        handleUserLogin(username, password);
    }

    React.useEffect(() => {
        if (!!authedUser) {
            navigate('/');
        }
    }, [authedUser]);

    return (<Container>
        <h2>Login</h2>
        <Paper>
            <PaddedDiv>
                <LoginIcon src={pollIcon} />
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
                <Box sx={{display: 'flex', flexDirection: 'horizontal', justifyContent: 'center'}}>
                    <Button type='submit' variant='contained' onClick={handleSubmit}>Login</Button>
                </Box>
            </PaddedDiv>
        </Paper>
    </Container>);
}

const mapStateToProps = ({auth}) => ({
    authedUser: auth.authedUser
});

const mapDispatchToProps = (dispatch) => ({
    handleUserLogin: async (username, password) => dispatch(await handleLoginUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);