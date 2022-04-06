import * as React from 'react';


import {Box, Button, Container, styled, Typography} from '@mui/material';
import {useNavigate} from "react-router";

const PaddedBox = styled(Box)({
    padding: '20px'
});

const NotFound = () => {

    const navigate = useNavigate();

    const _goToHome = () => {
        navigate('/');
    }

    return <Container>
        <PaddedBox sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography textAlign='center'>Question not found</Typography>
            <Button onClick={() => _goToHome()}>Go to home</Button>
        </PaddedBox>
    </Container>

}

export default NotFound;