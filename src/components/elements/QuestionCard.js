import {Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import {useNavigate} from 'react-router';
import {DateTime} from 'luxon';

const QuestionCard = ({question}) => {

    const navigate = useNavigate();

    const goToQuestionDetail = () => {
        console.log(`Go to question detail`);
        navigate(`/questions/${question.id}`);
    }


    return (<Card>
        <CardHeader title={question?.author} />
        <CardContent>
            <span>{DateTime.fromMillis(question?.timestamp).toFormat('dd-MM-yyyy | HH:mm:ss')}</span><br />
        </CardContent>
        <CardActions>
            <Button onClick={goToQuestionDetail}>SHOW</Button>
        </CardActions>
    </Card>);
}


export default QuestionCard;