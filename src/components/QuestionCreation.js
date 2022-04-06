import * as React from 'react';

import {connect} from 'react-redux';
import {Navigate} from "react-router";
import {Alert, Box, Button, Container, FormGroup, styled, TextField, Typography} from '@mui/material';

import {handleSaveQuestion} from '../actions/questions';

const TitleTypography = styled(Typography)({
    fontSize: '16px'
});

const SubtitleTypography = styled(Typography)({
    fontSize: '14px'
});

const PaddedBox = styled(Box)({
    padding: 40
});

const QuestionCreation = ({authedUser, savedQuestion, saveQuestionError, handleSaveQuestion}) => {

    const optionOneRef = React.useRef();
    const optionTwoRef = React.useRef();

    const [optionOne, setOptionOne] = React.useState('');
    const [optionTwo, setOptionTwo] = React.useState('');

    const [disabledSubmit, setDisabledSubmit] = React.useState(true);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [redirectToHome, setRedirectToHome] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    React.useEffect(() => {
        if (!!savedQuestion) {
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false);
                setRedirectToHome(true);
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedQuestion]);

    React.useEffect(() => {
        if (!!saveQuestionError) {
            setErrorMessage(saveQuestionError);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveQuestionError]);

    const _handleSaveQuestion = () => {
        if (!evaluateFieldError(optionOne) && !evaluateFieldError(optionTwo)) {
            handleSaveQuestion({
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: authedUser?.id
            });
        }
    }

    const handleChangeOptionOne = (event) => {
        const optionOneValue = event.target.value;
        setOptionOne(optionOneValue)
        setDisabledSubmit(evaluateDisabledSubmit(optionOneValue, optionTwo));
    }

    const handleChangeOptionTwo = (event) => {
        const optionTwoValue = event.target.value;
        setOptionTwo(optionTwoValue);
        setDisabledSubmit(evaluateDisabledSubmit(optionOne, optionTwoValue));
    }

    const evaluateFieldError = (value) => {
        const hasError = !value || value.trim().length === 0;
        return hasError;
    }

    const evaluateDisabledSubmit = (optionOne, optionTwo) => {
        const enabled = !evaluateFieldError(optionOne) && !evaluateFieldError(optionTwo);
        return !enabled;
    }

    return (redirectToHome ? <Navigate to='/' replace={true}/> : <Container>
        <PaddedBox>
            <TitleTypography textAlign='center' variant='h4'>
                Would You Rather
            </TitleTypography>
        </PaddedBox>
        <PaddedBox>
            <SubtitleTypography textAlign='center' variant='h5'>
                Create your own poll
            </SubtitleTypography>
        </PaddedBox>
        <PaddedBox>
            <FormGroup>
                <TextField
                    inputProps={{
                        'data-testid': 'option-one'
                    }}
                    ref={optionOneRef}
                    label='Option One'
                    helperText='Insert not empty value'
                    variant='standard'
                    name='optionOne'
                    onChange={handleChangeOptionOne}
                    error={evaluateFieldError(optionOne)}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    inputProps={{
                        'data-testid': 'option-two'
                    }}
                    ref={optionTwoRef}
                    label='Option Two'
                    helperText='Insert not empty value'
                    variant='standard'
                    name='optionTwo'
                    onChange={handleChangeOptionTwo}
                    error={evaluateFieldError(optionTwo)}/>
            </FormGroup>
        </PaddedBox>
        <PaddedBox>
            {showSuccess ?
                <Alert data-testid='success-alert' severity="success">Question saved successfully!</Alert> : null
            }
            {!!errorMessage ?
                <Alert data-testid='error-alert' severity="error">{errorMessage}</Alert> : null
            }
        </PaddedBox>
        <PaddedBox sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'center'}}>
            <Button
                data-testid='submit'
                variant='outlined'
                disabled={disabledSubmit}
                onClick={() => _handleSaveQuestion()}>Submit</Button>
        </PaddedBox>
    </Container>);
};

const mapStateToProps = ({auth, questions}) => ({
    authedUser: auth?.authedUser ?? null,
    savedQuestion: questions?.savedQuestion,
    saveQuestionError: questions?.saveQuestionError
});

const mapDispatchToProps = (dispatch) => ({
    handleSaveQuestion: async (question) => dispatch(await handleSaveQuestion(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreation);