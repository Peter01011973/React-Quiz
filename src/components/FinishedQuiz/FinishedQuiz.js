import React from 'react';
import './FinishedQuiz.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom'


const FinishedQuiz = (props) => {
    console.log("Results: ",props.results);
    let rigthAnswers = 0;
    return (
        
        <div className={'FinishedQuiz'}>
            <ul>
                {props.quiz.map((quizItem, index)=>{
                    const _class = props.results[index] === 'success' ? 'Finish fa fa-check success' : 'Finish fa fa-times error';
                    rigthAnswers = props.results[index] === 'success' ? ++rigthAnswers : rigthAnswers;
                    return (
                        <li key = {index}>
                            <strong>{quizItem.id}.</strong>&nbsp;
                            {quizItem.question}&nbsp;
                            <i className = {_class}></i>
                        </li>
                    )
                })}
            </ul>
            <p>Right answers: {rigthAnswers} from {props.quiz.length}</p>
            <div>
                <Button 
                    onClick={props.onRetry}
                    type = 'primary'
                >Repeat</Button>
                <Link to = '/'>
                    <Button 
                        type = 'success'
                    >Switch to the list of the quizes
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz
