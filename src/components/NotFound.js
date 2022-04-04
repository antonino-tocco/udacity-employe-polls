import * as React from 'react';

import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {Box, Button, Card, CardHeader, Container, Grid, Switch, Typography} from '@mui/material';

import {handleRetrieveQuestions} from '../actions/questions';
import QuestionCard from './elements/QuestionCard';

const NotFound = ({

}) => {
    return <Container>
        <Typography textAlign='center'>Page not found</Typography>
    </Container>

}

export default NotFound;