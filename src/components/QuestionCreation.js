import * as React from 'react';

import { connect } from 'react-redux';
import {Box, Button, Container, FormGroup, styled, TextField, Typography} from '@mui/material';

import { handleSaveQuestion } from '../actions/questions';

const TitleTypography = styled(Typography)({
    fontSize: '16px'
});

const SubtitleTypography = styled(Typography)({
    fontSize: '14px'
})

const QuestionCreation = ({handleSaveQuestion}) => {

    const optionOneRef = React.useRef();
    const optionTwoRef = React.useRef();

    const [optionOneError, setOptionOneError] = React.useState(false);
    const [optionTwoError, setOptionTwoError] = React.useState(false);

    const _handleSaveQuestion = () => {
        const optionOne = optionOneRef?.current?.value;
        const optionTwo = optionTwoRef?.current?.value;
        if (!!optionOne && !!optionTwo) {
            handleSaveQuestion({

            });
        }
    }

    const handleChangeOptionOne = (event) => {
        const optionOne = event.target.value;
        const hasError = !optionOne || optionOne?.trim()?.length === 0;
        setOptionOneError(hasError);
    }

    const handleChangeOptionTwo = (event) => {
        const optionTwo = event.target.value;
        const hasError = !optionTwo || optionTwo?.trim()?.length === 0;
        setOptionTwoError(hasError);
    }

    return <Container>
        <TitleTypography textAlign='center' variant='h4'>
            Would You Rather
        </TitleTypography>
        <SubtitleTypography textAlign='center' variant='h5'>
            Create your own poll
        </SubtitleTypography>
        <FormGroup>
            <TextField
                ref={optionOneRef}
                helperText='Option One'
                variant='standard'
                name='optionOne'
                onChange={handleChangeOptionOne}
                error={optionOneError}
                />
        </FormGroup>
        <FormGroup>
            <TextField
                ref={optionTwoRef}
                helperText='Option Two'
                variant='standard'
                name='optionTwo'
                onChange={handleChangeOptionTwo}
                error={optionTwoError}/>
        </FormGroup>
        <Box sx={{display: 'flex', flexDirection: 'horizontal', flexGrow: 1, justifyContent: 'center'}}>
            <Button variant='text'
                    disabled={optionOneError || optionTwoError}
                    onClick={() => _handleSaveQuestion()}>Submit</Button>
        </Box>
    </Container>;
};

const mapStateToProps = ({}) => ({

});

const mapDispatchToProps = (dispatch) => ({
    handleSaveQuestion: async (question) => await dispatch(handleSaveQuestion(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreation);