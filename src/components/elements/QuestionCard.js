import {Box, Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import {DateTime} from 'luxon';

const QuestionCard = ({question, goToDetail}) => {


    const goToQuestionDetail = () => {
        console.log(`Go to question detail`);
        goToDetail(question);
    }


    return (<Card>
        <CardHeader title={question?.author} />
        <CardContent>
            <span>{DateTime.fromMillis(question?.timestamp).toFormat('dd-MM-yyyy | HH:mm:ss')}</span><br />
        </CardContent>
        <CardActions>
            <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Button sx={{width: '100%'}} variant='outlined' onClick={goToQuestionDetail}>SHOW</Button>
            </Box>
        </CardActions>
    </Card>);
}


export default QuestionCard;