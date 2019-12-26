import React from 'react';
import './AnswerItem.css';

const AnswerItem = props => {
    let _class = 'AnswerItem';
    
    if (props.state) {
        _class = _class + ' '+props.state;
    }
    
    return (
        <li 
            className = {_class}
            onClick = {()=>props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem