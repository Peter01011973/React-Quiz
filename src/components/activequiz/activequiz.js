import React from 'react';
import './activequiz.css';
import AnswersList from './AnswersList/AnswersList.js'

const Activequiz = props => {
    return(
    <div className={'ActiveQuiz'}>
        <p className={'Question'}>
            <span>
                <strong>{props.currentQuiz}. </strong>{props.quiz.question}
            </span>
            <small>{props.currentQuiz} from {props.quizLength}</small>
        </p>
        <ul>
            <AnswersList 
                answers = {props.quiz.answers}
                onAnswerClick = {props.onAnswerClick}
                state = {props.state}
            />
        </ul>
    </div>
    )
}
export default Activequiz