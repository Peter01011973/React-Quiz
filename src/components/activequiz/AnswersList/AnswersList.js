import React from 'react';
import './AnswersList.css';
import AnswerItem from './AnswerItem/AnswerItem.js'

const AnswersList = props => (
    <ul className = {'AnswersList'}>
        {props.answers.map((item, index) => {
            return (
                <AnswerItem 
                    key={index} 
                    answer = {item}
                    onAnswerClick = {props.onAnswerClick}
                    state = {props.state ? props.state[item.id]:null}
                />
            )
        })}
    </ul>
)

export default AnswersList